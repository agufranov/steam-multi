import React from 'react';
import { observer } from 'mobx-react';

@observer
class Player extends React.Component {
  onDelete = () => {
    this.props.onDelete(this.props.player);
  }

  render() {
    const { player } = this.props;
    return (
      <div>
        <h3>{player.realname} <i>[{player.username}]</i></h3>
        <img src={player.avatar}/>
        <button onClick={this.onDelete}>Remove</button>
      </div>
    )
  }
}

export default Player;
