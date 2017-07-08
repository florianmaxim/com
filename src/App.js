import React, { Component } from 'react';

import './App.css';

import items from './Items.json'

const DEFAULT = {
  logo: 'mf',
  info: [
    'I am a space developer walking on the blockchain.',
    'hello@maximflorian.com 0049 01590 100 50 85',
    ''
  ],
  loader: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      logo: DEFAULT.logo,
      info: 0,
      items: items.items
    }
  }

  componentWillMount(){
    this.updateViewport();
  }

  componentDidMount(){
    window.addEventListener('scroll', (event) => {
      this.updateViewport();
    })
    window.addEventListener('resize', (event) => {
      this.updateViewport();
    })
  }

  updateViewport() {
    this.setState({
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight
      }
    });
  }

  setItems(items){
    return(
      items.map((item, index) => {

        const inView = this.state.viewport.top>=(index-1)*this.state.viewport.height

        if(inView){
          return (
            <div key={index} className="item"><img className="image" alt={item[0]} style={{opacity: '1'}} src={item[0]} /></div>
          );
        }else{
          return (
            <div key={index} className="item"><img className="image" alt={item[0]} style={{opacity: '0'}} src={item[0]} /></div>
          );
        }

      })
    );
  }

  setLogo(logo){
    return(
      <div className="logo" onClick={(event)=>{this.handleInfo(event)}}>{}</div>
    )
  }

  setInfo(info){
    return(
      <div className="info">{DEFAULT.info[this.state.logo]}</div>
    )
  }

  handleInfo(event){
    event.preventDefault();
    this.setState({
      logo: this.state.logo<DEFAULT.logo.length?this.state.logo+1:0
    })
  }

  render() {
    return (
      <div className="App">
        {this.setLogo(this.state.logo)}
        {this.setItems(this.state.items)}
        {this.setInfo(this.state.info)}
      </div>
    );
  }
}
