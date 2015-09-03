const React = require('react-native');
const SideMenu = require('react-native-side-menu');

const {
  View,
  Text,
} = React;

const CardPage = require('./card_page');
const Menu = require('./menu');

class Application extends React.Component {

  render() {
    return (
      <SideMenu menu={<Menu navigator={navigator} />}
        touchToClose={true}
      >
        <CardPage.Component />
      </SideMenu>
    );
  }

};

module.exports = Application;
