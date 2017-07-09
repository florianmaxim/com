import React, { Component } from 'react';

import './App.css';

import items from './Items.json'

let DEFAULT = {
  logo: 'mf',
  info: [
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
      }
    });
  }

  handleOnLoad(event, index){
    event.preventDefault();

    this.updateViewport();

    let _loaded = index===0?true:this.state.loaded;

    let _items = this.state.items;
        _items[index][1] = true;

    this.setState({
      loaded: _items,
      items: _items
    })

    this.forceUpdate();
  }

  setItems(items){
    return(
      items.map((item, index) => {

        const inView = this.state.viewport.top>=(index-1)*this.state.viewport.height;

        const isLoaded = items[index][1];

        if(inView){
            if(isLoaded){
                return <div key={index} className="item"><img className="image" alt={item[0]} src={item[0]} style={{opacity:'1', display: 'block'}} onLoad={(event)=>{this.handleOnLoad(event,index)}}/></div>
            }else{
                return(
                    <div key={index} className="item">
                      <div className="loader"/>
                      <img className="image" alt={item[0]} src={item[0]} style={{opacity:'0', display: 'none'}} onLoad={(event)=>{this.handleOnLoad(event,index)}}/>
                  </div>
                );
            }
        }else{
          return  <div className="item" key={index}/>
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
    return <div className="info"><a href={this.state.itemPointer!==0?this.state.items[this.state.itemPointer][3]:'https://maximflorian.com'} target="_blank">{this.state.info[this.state.infoPointer]}</a></div>
  }

  handleInfo(event){
    this.setState({
      infoPointer: this.state.infoPointer<DEFAULT.info.length?this.state.infoPointer+1:0
    })
  }

  handleItem(event){
    this.setState({
      infoPointer: this.state.infoPointer<DEFAULT.info.length?this.state.infoPointer+1:0
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
