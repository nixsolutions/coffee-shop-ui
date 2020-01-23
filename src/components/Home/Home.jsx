import React from 'react';
import useStyles from './Style';
import slide1 from '../../media/slide1.jpg';
import { Search as SearchIcon } from '@material-ui/icons/';
import { InputBase } from '@material-ui/core/';

function Home(){   
    const classes = useStyles();
    const CategoriesList = () => {
        const categories = ['Type1', 'Type2', 'Type3', 'Type4'];
        const listItems = categories.map((category) =>
          <li key={category}>
            <button className={classes.catName} type="button">
                {category}
            </button>
          </li>
          
        );
        return (
          <ul className={classes.catList}>{listItems}</ul>
        );
    }

    return  (
        <div className={classes.greetingUnit}>
            <img className={classes.slideImages} src={slide1} alt=""/>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <CategoriesList/>
        </div>
    );
};

export default Home;
