import React, { Component } from 'react';

import './App.css';

import items from './Items.json'

let DEFAULT = {
  logo: 'mf',
  info: [
    '',
    'Graphics programmer and space developer, walking on the blockchain.',
    'hello@maximflorian.com',
    '0049 01590 100 50 85',
    '0x5c5736CC67D0a2F84a0b77DB1fE4A6579BbeE78A',
    ''
  ]
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      _mounted: false,

      viewport: {
        top: 0,
        height: 0
      },

      length: 0,

      loaded: false,
      logo: DEFAULT.logo,

      items: items.items,

      item: items.items[0],
      itemPointer: 0,

      info: DEFAULT.info,
      infoPointer: 0
    }
  }

  componentWillMount(){
    this.updateViewport();
  }

  componentDidMount(){

    this.setState({
      //Once in a lifetime set the initial window height
      length: !this.state._mounted?window.innerHeight:this.state.length,
      _mounted: true
    })

    window.addEventListener('scroll', (event) => {
      this.updateViewport();

      let _itemPointer  = (this.state.viewport.top/this.state.viewport.height).toFixed(0);
      let _item     = this.state.items[_itemPointer];

      this.setState({
        itemPointer: _itemPointer,
        item: _item,
      });

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
      },
    });
  }

  handleOnLoad(event, index){
    event.preventDefault();

    let _items = this.state.items;
        _items[index][1] = true;

    let _length = this.state.length+window.innerHeight;

    this.setState({
      loaded: _items[index][1],
      items: _items,

      length: _length
    })
  }

  setItems(){
    return(
      this.state.items.map((item, index) => {

        const inView   = this.state.viewport.top>=(index)*this.state.viewport.height;
        const isLoaded = this.state.items[index][1];

        if(inView){
            console.log('item '+index+' is in view');

            if(isLoaded){
              console.log('item '+index+' is loaded');
              return(
                  <div key={index} className="item">

                      <img style={{opacity:'1'}} className="image" alt={item[0]} src={item[0]} />

                      <div className="loader" style={{opacity:'0'}} />

                  </div>
                )
            }else{
              console.log('loading item '+index);
              return(
                  <div key={index} className="item">

                      <img style={{opacity:'0'}} className="image" alt={item[0]} src={item[0]}  onLoad={(event)=>{this.handleOnLoad(event,index)}}/>

                      <div className="loader"  style={{opacity:'1'}} />

                  </div>
              );
            }

        }else{
          if(isLoaded){
            return(
                <div key={index} className="item">
                  <img className="image" alt={item[0]} src={item[0]} style={{opacity:'0'}}/>
                </div>
              )
          }
        }
      })
    );
  }

  setLogo(logo){
    if(!this.state.loaded) return;
    return(
      <div className="logo" onClick={(event)=>{this.handleInfo(event)}}>{}</div>
    )
  }

  setInfo(info){
    return <div className="info">{DEFAULT.info[this.state.infoPointer]}</div>
  }

  handleInfo(event){
    this.setState({
      infoPointer: this.state.infoPointer<DEFAULT.info.length?this.state.infoPointer+1:0
    })
  }

  render() {
    return (
      <div className="App" style={{height: this.state.length+'px'}}>
        {this.setLogo(this.state.logo)}
        {this.setItems()}
        {this.setInfo(this.state.info)}
      </div>
    );
  }
}
