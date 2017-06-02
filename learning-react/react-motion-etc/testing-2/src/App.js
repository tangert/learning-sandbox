import React, { createClass } from 'react';
import './App.css';

//PARENT
var FriendsContainer = createClass({
  getInitialState: function(){
    return {
      name: this.props.name,
      friends: ['Reza','Jacob','Sam','Serena']
    }
  },

  addFriend: function(friend){
    this.setState({
        friends: this.state.friends.concat(friend)
    })

  },

  // Invoked once before first render
  componentWillMount: function(){
      // Calling setState here does not cause a re-render
      console.log('In Component Will Mount');
  },
  // Invoked once after the first render
  componentDidMount: function(){
      // You now have access to this.getDOMNode()
      console.log('In Component Did Mount');
  },
  // Invoked whenever there is a prop change
  // Called BEFORE render
  componentWillReceiveProps: function(nextProps){
      // Not called for the initial render
      // Previous props can be accessed by this.props
      // Calling setState here does not trigger an additional re-render
      console.log('In Component Will Receive Props');
  },
  // Called IMMEDIATELY before a component is unmounted
  componentWillUnmount: function(){},

  render: function(){
    return(
      <div>
      <h1>Hey {this.state.name}!</h1>
      <AddFriend addFriend = {this.addFriend}/>
      <FriendsList friends = {this.state.friends}/>
      </div>
    )
  }
});

//ADD FRIEND BUTTON
var AddFriend = createClass({
  //initializes a new friend
  getInitialState: function(){
    return{
      newFriend:''
    }
  },

  //updates the state's new friend value in real time
  updateNewFriend: function(e){
    console.log(e.target.value);
      this.setState({
        newFriend: e.target.value
      })
  },

  //handled on button press
  handleSubmit: function(e){
    this.props.addFriend(this.state.newFriend);
    this.setState({
      newFriend: ''
    })
  },
  
  render: function() {
    return(
      <div>
        <input
          type='text'
          placeholder='add a new friend here'
          onChange={this.updateNewFriend}>
        </input>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
})

var FriendsList = createClass({
  render: function() {
    var items = this.props.friends.map(
      (friend) => <li key = {friend}>{friend}</li>
      );
    return(
      <div>
        <h2>Here are your friends: </h2>
        <ol>{items}</ol>
      </div>
    )
  }
})

var App = createClass({
  render: function(){
    return (
      <div>
        <FriendsContainer name = "Tyler"/>
      </div>
    )
  }
});

export default App;
