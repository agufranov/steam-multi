import React from 'react';
import { observer } from 'mobx-react';

@observer
class Player extends React.Component {
  onDelete = () => {
    this.props.onDelete(this.props.player.steamid);
  }

  render() {
    const { player } = this.props;
    return (
      <div>
        <h3>{player.info.realname} <i>({player.username}) [{player.steamid}]</i></h3>
        <img src={player.info.avatar}/>
        <button onClick={this.onDelete}>Remove</button>
      </div>
    )
  }
}

export default Player;
