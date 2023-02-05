import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/Searchbar/SearchBar';
import { getImages } from 'components/service/API';
import { useEffect, useState } from 'react';
import { AppBox } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { PuffLoader } from 'components/Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      async function fetchImages() {
        try {
          setLoader(prevState => {
            return !prevState;
          });
          await getImages(query, page).then(resp => {
            if (resp.hits.length) {
              setImages(prevState => {
                return [...prevState, ...resp.hits];
              });
              setShowBtn(page < Math.ceil(resp.totalHits / 12));
            } else {
              toast.error('Enter a more meaningful search term');
            }
          });
        } catch (error) {
          console.log(error);
          toast.error("We're in trouble, sorry");
        } finally {
          setLoader(prevState => {
            return !prevState;
          });
        }
      }
      fetchImages();
    }
  }, [page, query]);

  const onGetRequest = ({ search }) => {
    if (search.trim()) {
      setImages([]);
      setPage(1);
      setQuery(search);
    } else {
      toast.error('Please enter any query');
    }
  };

  const nextPage = () => {
    setPage(pervState => pervState + 1);
  };

  return (
    <AppBox>
      <Toaster position="top-right" />
      <SearchBar onSubmit={onGetRequest} />
      <ImageGallery images={images} />
      {showBtn && <Button nextPage={nextPage} />}
      {loader && <PuffLoader />}
    </AppBox>
  );
};
