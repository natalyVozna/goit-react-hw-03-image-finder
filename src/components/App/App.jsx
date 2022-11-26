import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import * as API from '../../services/api';
import { Status } from 'constants/fetch-status';

export class App extends Component {
  state = {
    gallery: [],
    status: Status.Idle,
    search: '',
    page: 1,
    totalImg: 0,
    loadMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { gallery, search, page, loadMore } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ status: Status.Loading });
      try {
        let resPhotos = null;
        if (loadMore) {
          resPhotos = await API.getPtotos({ q: search, page });
          this.setState(({ gallery }) => ({
            gallery: [...gallery, ...resPhotos.hits],
            totalImg: resPhotos.total,
            status: Status.Success,
          }));
        } else {
          resPhotos = await API.getPtotos({ q: search, page: 1 });
          this.setState({
            gallery: resPhotos.hits,
            status: Status.Success,
            totalImg: resPhotos.total,
          });
          toast.success(`${resPhotos.totalHits} images found for your request`);
        }

        if (resPhotos.hits.length === 0) {
          toast.error('Nothing found for your request');
          throw new Error('Nothing found for your request');
        }
        // setStatus(Status.Success);
        // this.setState({ page: 1 });
        // const resPhotos = await API.getPtotos(params);
        // this.setState({
        //   gallery: resPhotos.hits,
        //   status: Status.Success,
        //   totalImg: resPhotos.total,
        // });
      } catch (error) {
        this.setState({ status: Status.Error });
      }
    }

    if (prevState.gallery.length !== gallery.length) {
      const element = document.getElementById('loadMore');
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().height + 100,
          left: 100,
          behavior: 'smooth',
        });
      }
    }
  }

  fetchPhotos = async params => {
    this.setState({ status: Status.Loading });
    try {
      this.setState({ page: 1 });
      const resPhotos = await API.getPtotos(params);
      this.setState({
        gallery: resPhotos.hits,
        status: Status.Success,
        totalImg: resPhotos.total,
      });
    } catch (error) {
      this.setState({ status: Status.Error });
    }
  };

  handleSubmit = search => {
    this.setState({
      loadMore: false,
      page: 1,
      search,
    });
  };

  handleLoadMore = async () => {
    const { search, page } = this.state;
    this.setState({ status: Status.Loading });
    this.setState(prevState => ({
      page: prevState.page + 1,
      loadMore: true,
    }));
  };

  render() {
    const { search, gallery, totalImg, status } = this.state;

    return (
      <>
        <Container>
          <Searchbar onSubmitSearch={this.handleSubmit} />
          <ImageGallery
            onLoadMore={this.handleLoadMore}
            search={search}
            gallery={gallery}
            totalImg={totalImg}
            status={status}
          />
        </Container>
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
