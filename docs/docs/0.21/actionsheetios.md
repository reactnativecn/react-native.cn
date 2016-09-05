### 截图
![showActionSheetWithOptions](img/api/actionsheetios1.png)

![showShareActionSheetWithOptions](img/api/actionsheetios2.png)

### 方法

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="showactionsheetwithoptions"></a><span class="propType">static </span>showActionSheetWithOptions<span class="propType">(options: Object, callback: Function)</span> <a class="hash-link" href="#showactionsheetwithoptions">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="showshareactionsheetwithoptions"></a><span class="propType">static </span>showShareActionSheetWithOptions<span class="propType">(options: Object, failureCallback: Function, successCallback: Function)</span> <a class="hash-link" href="#showshareactionsheetwithoptions">#</a></h4></div>
</div>

### 例子

```javascript
'use strict';

var React = require('react-native');
var {
  ActionSheetIOS,
  StyleSheet,
  Text,
  View,
} = React;

var BUTTONS = [
  'Option 0',
  'Option 1',
  'Option 2',
  'Destruct',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

var ActionSheetExample = React.createClass({
  getInitialState() {
    return {
      clicked: 'none',
    };
  },

  render() {
    return (
      <View>
        <Text onPress={this.showActionSheet} style={style.button}>
          Click to show the ActionSheet
        </Text>
        <Text>
          Clicked button: {this.state.clicked}
        </Text>
      </View>
    );
  },

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }
});

var ShareActionSheetExample = React.createClass({
  getInitialState() {
    return {
      text: ''
    };
  },

  render() {
    return (
      <View>
        <Text onPress={this.showShareActionSheet} style={style.button}>
          Click to show the Share ActionSheet
        </Text>
        <Text>
          {this.state.text}
        </Text>
      </View>
    );
  },

  showShareActionSheet() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'https://code.facebook.com',
    },
    (error) => {
      console.error(error);
    },
    (success, method) => {
      var text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
      this.setState({text});
    });
  }
});

var style = StyleSheet.create({
  button: {
    marginBottom: 10,
    fontWeight: '500',
  }
});

exports.title = 'ActionSheetIOS';
exports.description = 'Interface to show iOS\' action sheets';
exports.examples = [
  {
    title: 'Show Action Sheet',
    render(): ReactElement { return <ActionSheetExample />; }
  },
  {
    title: 'Show Share Action Sheet',
    render(): ReactElement { return <ShareActionSheetExample />; }
  }
];
```