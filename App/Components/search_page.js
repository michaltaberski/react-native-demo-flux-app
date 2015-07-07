var React = require('react-native');

var {
  View,
  Text,
} = React;

class Search extends React.Component {

  render() {
    return(
      <View>
        <Text style={{marginTop: 100}}>Search INPUT</Text>
      </View>
    );
  }

}

module.exports = {
  component: Search,
  title: 'Search:',
};
