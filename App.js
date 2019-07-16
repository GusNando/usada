import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './src/screens/Home';
import Database from './src/screens/Database';
import Splash from './src/screens/Splash';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Database: Database,
    Splash: Splash,
  },
  {
    initialRouteName: "Splash",
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);


export default createAppContainer(AppNavigator);
