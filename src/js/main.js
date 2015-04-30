/*
var Paragraph = React.createClass({

    getInitialState: function(){
        return {
            id: 0,
            content: "",
            edited: false,
            saved: false,
            selected: false,
        }
    },
    onComponentDidMount: function(){


    },
    handleClick: function(){
        this.selected = true;
    },

    render: function(){
        return (
         <p className="paragraph" contentEditable={true}> {this.content} </p>
            )
    }
})

var Document = React.createClass({
    getInitialState: function(){
        return {
            id:"",
            paragraphs: [],
            meta:{}
        }

    },
    render: function(){
        var nodes;
        if (this.paragraphs){
            nodes = this.paragraphs.map(function(paragraph){
            return (<Paragraph>{p.content}</Paragraph>)
        })
        }
        else {
            nodes = <Paragraph />
        }
         

        return (
            <div className="Document z-depth-2">
            {nodes}
            </div>
        )
    }
})

var Navigation = React.createClass({
    getInitialState: function(){return {}},
    render: function(){
        return (
            <div className="row">
            <div className="s12 Navigation z-depth-1">
            <span> Note </span>
            </div>
            </div>
            )
    }
})


var App = React.createClass({
  render: function(){
    return (
      <div>
        <Navigation />
        <Document />
      </div>
    )
  }
});


*/