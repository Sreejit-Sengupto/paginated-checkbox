import React from "react";
import { createContext, useContext } from "react";
import { databases } from "../appwrite/config";
import { Models, Query } from "appwrite";
import { useUserContext } from "./user-provider";

export interface Item extends Models.Document {
  itemId: string;
  name: string;
  userId: string;
}

interface ProductContextData {
  items: Item[];
  userPrefs: Item[];
  total: number;
  getItems: (offset: number) => void;
  deleteLocalUserPrefs: (itemId: string) => Item[];
  addLocalUserPrefs: (pref: Item) => void;
}

const ProductContext = createContext<ProductContextData | null>(null);

export const ProductContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // states
  const [items, setItems] = React.useState<Item[]>([]); // store items
  const [userPrefs, setUserPrefs] = React.useState<Item[]>([]); // user saved items
  const [total, setTotal] = React.useState(0); // total documents

  const { user } = useUserContext(); // User context data

  // Get items for every page
  const getItems = async (page: number = 1) => {
    try {
      const offset = (page - 1) * 6;
      const result = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_ITEMS_COLLECTION_ID,
        [Query.limit(6), Query.offset(offset)]
      );
      setItems(result.documents as Item[]);
      setTotal(result.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Get the preferences of the currently logged in user
  const getUserPrefs = async () => {
    try {
      const result = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERPREF_COLLECTION_ID,
        [Query.equal("userId", [user?.$id!])]
      );
      setUserPrefs(result.documents as Item[]);
    } catch (error) {
      console.log(error);
    }
  };

  // Method to add item locally
  const addLocalUserPrefs = (pref: Item) =>
    setUserPrefs((prev) => [...prev, pref]);

  // Method to delete item locally
  const deleteLocalUserPrefs = (itemId: string): Item[] => {
    const deletedItem = userPrefs?.filter((item) => item.itemId === itemId);
    const updatedPrefs = userPrefs?.filter((item) => item.itemId !== itemId);
    setUserPrefs(updatedPrefs);
    return deletedItem;
  };

  React.useEffect(() => {
    getItems();
    getUserPrefs();
  }, []);

  const contextData = {
    items,
    userPrefs,
    total,
    getItems,
    deleteLocalUserPrefs,
    addLocalUserPrefs,
  };

  return (
    <ProductContext.Provider value={contextData}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductData = () => {
  return useContext(ProductContext) as ProductContextData;
};

export default ProductContext;
