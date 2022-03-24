import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/auth/Login";
import Home from "../components/Home/Home";
import Movie from "../components/Movie/Movie";
import User from "../components/User/User";
import {
  ADVERTISEMENT,
  ADVERTISEMENT_CREATE,
  HOME,
  LOGIN,
  MOVIE,
  MOVIE_CREATE,
  MOVIE_UPDATE,
  USER,
} from "../config/path";
import Cookies from "cookies-js";
import { isLogin } from "../config/function";
import { Redirect } from "react-router-dom";
import Advertisement from "../components/Advertisement/Advertisement";
import AdvertisementModify from "../components/Advertisement/AdvertisementModify";
import MovieCreate from "../components/Movie/MovieCreate";
import MovieUpdate from "../components/Movie/MovieUpdate";

const AppRouter = () => {
  if (Cookies.get("token")) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer" + Cookies.get("token");
  }
  return (
    <Router>
      <Switch>
        <Route
          path={HOME}
          exact
          component={() => (!isLogin() ? <Redirect to={LOGIN} /> : <Home />)}
        />
        <Route
          path={USER}
          exact
          component={() => (!isLogin() ? <Redirect to={LOGIN} /> : <User />)}
        />
        <Route
          path={LOGIN}
          component={() => (isLogin() ? <Redirect to={HOME} /> : <Login />)}
        />
        {/*Route movie :*/}
        <Route
          path={MOVIE}
          exact
          component={() => (!isLogin() ? <Redirect to={LOGIN} /> : <Movie />)}
        />
        <Route
          path={MOVIE_CREATE}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <MovieCreate />
          }
        />
        <Route
          path={MOVIE_UPDATE}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <MovieUpdate />
          }
        />
        <Route
          path={ADVERTISEMENT}
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <Advertisement />
          }
        />
        <Route
          path={ADVERTISEMENT_CREATE}
          exact
          component={() =>
            !isLogin() ? <Redirect to={LOGIN} /> : <AdvertisementModify />
          }
        />
      </Switch>
    </Router>
  );
};
export default AppRouter;
