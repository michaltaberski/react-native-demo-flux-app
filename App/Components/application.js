const React = require('react-native');
const SideMenu = require('./SideMenu');

const {
  View,
  Text,
} = React;

const CardPage = require('./CardPage');
const Menu = require('./Menu');

class Application extends React.Component {

  render() {
    return (
      <SideMenu menu={<Menu navigator={navigator} />}
        touchToClose={true}
        openMenuOffset={180}
      >
        <CardPage.Component />
      </SideMenu>
    );
  }

};

module.exports = Application;
