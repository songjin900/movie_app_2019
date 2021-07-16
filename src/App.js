import React from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import Movies from './Movie';
import "./App.css"



// function Food({ name, picture, rating }) {
//   return <div>
//     <h2>I like {name}</h2>
//     <h5>rating: {rating}/5</h5>
//     <img src={picture} alt={name} width="200" height="180" />
//   </div>
// }

// const FoodILike = [
//   {
//     id: 1,
//     name: "kimchi",
//     image: "https://food-guide.canada.ca/themes/custom/wxtsub_bootstrap/images/food_guide_visual_en.png",
//     rating: 5
//   }, {
//     id: 2,
//     name: "sam",
//     image: "https://food-guide.canada.ca/themes/custom/wxtsub_bootstrap/images/food_guide_visual_en.png",
//     rating: 2
//   },
//   {
//     id: 3,
//     name: "bibi",
//     image: "https://food-guide.canada.ca/themes/custom/wxtsub_bootstrap/images/food_guide_visual_en.png",
//     rating: 4.3
//   },
//   {
//     id: 4,
//     name: "ham",
//     image: "https://food-guide.canada.ca/themes/custom/wxtsub_bootstrap/images/food_guide_visual_en.png",
//     rating: 4.2,
//   },
//   {
//     id: 5,
//     name: "meat",
//     image: "https://food-guide.canada.ca/themes/custom/wxtsub_bootstrap/images/food_guide_visual_en.png",
//     rating: 2.5
//   }
// ]

// Food.propTypes = {
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   rating: PropTypes.number.isRequired
// };
// //Function Component
// function App() {
//   return (
//     <div>
//       {FoodILike.map(x => (<Food key={x.id} name={x.name} picture={x.image} rating={x.rating} />))}
//     </div>
//   );
// }

// //Class component
// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     console.log("hello");
//   }

//   //state is an object; date that will change
//   state = {
//     count: 0
//   }
//   //setState re-render
//   //add() () means run right now
//   add = () => {
//     console.log("add");
//     this.setState(x => ({ count: x.count + 1 }));
//   };
//   minus = () => {
//     console.log("minus")
//     this.setState({ count: this.state.count - 1 });
//   };
//   componentDidMount() {
//     console.log("component did rendered");
//   }
//   componentDidUpdate() {
//     console.log("I just updated");
//   }
//   componentWillUnmount() {
//     console.log("bye");
//   }

//   render() {
//     console.log("i am rendering");
//     return <div>
//       <h1>The number is: {this.state.count}</h1>
//       <button onClick={this.add}>Add</button>
//       <button onClick={this.minus}>Minus</button>
//     </div>
//   }
// }

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  }

  getMovies = async () => {
    const { data: { data: { movies } } } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading: false });

  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading
          ? (<div className="loader">
            <span className="loader__text">Loading...</span>
          </div>)
          :
          <div className="movies">
            {movies.map(x => {
              return <Movies
                key={x.id}
                id={x.id}
                year={x.year}
                title={x.title}
                summary={x.summary}
                poster={x.medium_cover_image}
                genres={x.genres}
              />
            })}

          </div>
        }
      </section>
    );
  }
}

export default App;
