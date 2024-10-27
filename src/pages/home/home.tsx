import React from "react";
import Checkbox from "../../components/checkbox";
import { Item, useProductData } from "../../store/product-provider";
import { databases, ID } from "../../appwrite/config";
import {
  TbPlayerTrackNextFilled as LastPageIcon,
  TbPlayerTrackPrevFilled as FirstPageIcon,
} from "react-icons/tb";
import {
  GrNext as NextPageIcon,
  GrPrevious as PrevPageIcon,
} from "react-icons/gr";
import { LuLoader2 as Loader2 } from "react-icons/lu";
import { useUserContext } from "../../store/user-provider";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/page-numbers";

const Home = () => {
  // states
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  // Product Context Data
  const {
    items,
    total,
    getItems,
    userPrefs,
    deleteLocalUserPrefs,
    addLocalUserPrefs,
  } = useProductData();

  // User context data
  const { user, logout } = useUserContext();

  const navigate = useNavigate();

  React.useEffect(() => {
    // Get items whenenver page state changes
    getItems(page);
  }, [page]);

  // Method for paging
  const next = () => setPage((prev) => prev + 1); // next page
  const prev = () => setPage((prev) => prev - 1); // previous page
  const first = () => setPage(1); // first page
  const last = () => setPage(Math.ceil(total / 6)); // last page

  // Method to check if the item in the present in the user preference list or not
  // The methods accepts document ID of the item and checks if it is present in the user preference list's itemId field or not.
  const itemExists = (itemId: string) =>
    userPrefs?.some((item) => item.itemId === itemId);

  const togglePref = async (itemDocId: string, name: string) => {
    try {
      // check if the item exists in the user preferences or not
      if (itemExists(itemDocId)) {
        // if it exits, first remove it locally, for better UX
        const deletedItem = deleteLocalUserPrefs(itemDocId); // the removed item

        // Then remove it from the database
        await databases.deleteDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERPREF_COLLECTION_ID,
          deletedItem[0].$id
        );
      } else {
        // If it doesn't exists then first add it to the database
        const results = await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERPREF_COLLECTION_ID,
          ID.unique(),
          {
            itemId: itemDocId,
            name,
            userId: user?.$id,
          }
        );

        // then add it to the local list, this will reduce an extra DB call, next time when the page refreshes the fresh list will automatically be fetched.
        addLocalUserPrefs(results as Item);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Method for checking whether a checkbox should be checked or not
  const isChecked = (itemDocId: string) => {
    // The itemID in the user preference list is same as the document ID of the item in the all items list
    // Therefore, we check if the passed item document ID exists in the user preference list's itemId field or not.
    return userPrefs?.some((item) => item.itemId === itemDocId);
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const itemsList = items?.map((item) => {
    return (
      <Checkbox
        key={item.$id}
        label={item.name}
        checked={isChecked(item.$id)}
        onChange={() => togglePref(item.$id, item.name)}
      />
    );
  });

  return (
    <>
      <button
        className="ml-auto p-3 bg-black text-white rounded-lg mr-5 mt-2"
        onClick={logoutUser}
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" size={25} /> : "Logout"}
      </button>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[90%] lg:w-[576px] lg:h-[601px] border border-[#C1C1C1] rounded-xl flex flex-col justify-start items-center p-5 gap-5 my-2">
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="font-semibold text-3xl text-center">
              Please mark your interests!
            </p>
            <p>We will keep you notified.</p>
          </div>

          <div className="w-[90%] h-[2px] bg-[#EAEAEA]"></div>

          <div className="w-full flex flex-col justify-center items-start mr-auto gap-6">
            <p className="font-medium text-lg">My saved interest!</p>
            <div className="flex flex-col justify-center items-start gap-6">
              {itemsList}
            </div>
          </div>

          <div className="w-full flex items-center justify-center lg:gap-3 mt-auto text-[#ACACAC]">
            <button onClick={first} disabled={page === 1}>
              <FirstPageIcon size={30} />
            </button>
            <button onClick={prev} disabled={page === 1}>
              <PrevPageIcon size={30} />
            </button>

            {total && (
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(total / 6)}
                siblingCount={1}
                onPageChange={setPage}
              />
            )}

            <button onClick={next} disabled={page === Math.ceil(total / 6)}>
              <NextPageIcon size={30} />
            </button>
            <button onClick={last} disabled={page === Math.ceil(total / 6)}>
              <LastPageIcon size={30} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
