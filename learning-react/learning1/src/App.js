import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

var Stopwatch = React.createClass({
  getInitialState: function() {
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  },

  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 100);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  onTick: function() {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      })
    }
  },

  onStart: function() {
    this.setState({
      running: true,
      previousTime: Date.now()
    });
  },

  onStop: function() {
    this.setState({ running: false });
  },

  onReset: function() {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now()
    });
  },

  render: function() {
    var seconds = Math.floor(this.state.elapsedTime / 1000);

    return(
      <div className = "stopwatch">
        <h2>Stopwatch</h2>
        <div className = "stopwatch-time">{seconds}</div>
        { this.state.running?
          <button onClick = {this.onStop}> Stop </button>
          :
          <button onClick = {this.onStart}> Start </button>
        }
        <button onClick = {this.onReset}> Reset </button>
      </div>
    )
  }
});

var AddPlayer = React.createClass({
  propTypes: {
    onAdd: PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      name: "",
    };
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },

  onNameChange: function(e) {
    console.log('onNameChange', e.target.value);
    this.state.name = e.target.value;
    this.setState(this.state);
  },

  render: function() {
    return (
      <div className = "add-player-form">
        <form onSubmit = {this.onSubmit}>
          <input type = "text" value = {this.state.name} onChange = {this.onNameChange}/>
          <input type = "submit" value = "Add player!"/>
        </form>
      </div>
    )
  }
});

function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(accumulator, player) {
    return accumulator + player.score;
  }, 0);

  return(
    <table className = "stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: PropTypes.array.isRequired,
};

var Header = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired
  },

  defaultProps: {
    title: "Scoreboard"
  },

  render: function() {
    return (
        <div className = "header">
          <Stats players = {this.props.players}/>
          <h1>{this.props.title}</h1>
          <Stopwatch/>
        </div>
    );
  }
});

var Player = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    onScoreChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <div>
      <div className = "player">
        <div className = "player-name">
        <a className = "remove-player" onClick = {this.props.onRemove}> X </a>
          {this.props.name}
        </div>
        <Counter score = {this.props.score} onChange = {this.props.onScoreChange}/>
      </div>
      </div>
    );
  }

});

function Counter(props) {
  return (
    <div className = "counter">
      <button className = "counter-action decrement" onClick = {function(){ props.onChange(-1);}}> - </button>
      <div className = "counter-score"> {props.score} </div>
      <button className = "counter-action increment" onClick = {function() { props.onChange(1);}}> + </button>
    </div>
  )
}

Counter.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

var App = React.createClass({
  propTypes: {
    title: PropTypes.string,
    initialPlayers: PropTypes.arrayOf(PropTypes.object).isRequired
  },

  getDefaultProps: function() {
    return {
      title: "Scoreboard"
    }
  },

  getInitialState: function() {
    return {
      players: this.props.initialPlayers
    };
  },

  onScoreChange: function(index, delta) {
      this.state.players[index].score += delta;
      this.setState(this.state);
  },
a
  onPlayerAdd: function(name) {
    var currentPlayers = this.state.players;
    var last = currentPlayers.length-1;

    this.state.players.push({
        name: name,
        score: 0,
        id: (currentPlayers.length === 0 ? 1: currentPlayers[last].id + 1)
    });

    this.setState(this.state);
  },

  onPlayerRemove: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function() {
    return (
      <div className = "scoreboard">
        <Header title = {this.props.title} players = {this.state.players}></Header>
        <div className = "players">
          {this.state.players.map(function(player, index) {
            return(
            <Player
                  onRemove = {function() { this.onPlayerRemove(index)}.bind(this)}
                  onScoreChange={function(delta) { this.onScoreChange(index, delta)}.bind(this)}
                  name = {player.name}
                  score = {player.score}
                  key = {player.id}
              />
            );
            }.bind(this))
          }
        </div>
        <AddPlayer onAdd = {this.onPlayerAdd}/>
    </div>
    );
  }
})

export default App;
