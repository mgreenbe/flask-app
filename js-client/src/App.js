import React from 'react';
import XComponent from './xcomponent.js';
import { connect } from 'react-redux';

const itemStyle = {
  margin: '10px',
  padding: '20px',
  backgroundColor: 'whitesmoke'
};

const App = (props) => {
  return (
      <List />
  )
}

const mapStateToProps = (state) => {
  return {
    ids: state.get('ids'),
    components: state.get('components')
  }
}

const list = ({ids, components}) => {
  return (
    <div>
      {(ids) ? ids.map(
        (id, i) => <div style={itemStyle}><XComponent key={i} path={[id]} /></div>
      ) : <span>Loading</span>}
    </div>
  )
}

const List = connect(mapStateToProps)(list);


export default App
