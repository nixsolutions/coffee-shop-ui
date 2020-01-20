import React from 'react';
import { Slide } from 'react-slideshow-image';
import useStyles from './Style';

const slideImages = [
    'https://www.incimages.com/uploaded_files/image/970x450/getty_938993594_401542.jpg',
    'https://24tv.ua/resources/photos/news/201909/1206267.jpg?1568644662000',
    'https://st2.depositphotos.com/1177973/6745/i/950/depositphotos_67454865-stock-photo-many-cups-of-coffee-top.jpg'
  ];
   
  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
  }
   
  const Home = () => {
    const classes = useStyles();
    return (
      <div className="slide-container">
        <Slide {...properties}>
          {
            slideImages.map((each, index) => 
            <div className="each-slide">
              <img className={classes.slideImages} key={index} src={each} />
            </div>)
          }
        </Slide>
      </div>
    )
  }

export default Home;  