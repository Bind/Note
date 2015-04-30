var NoteStore=require('../stores/NoteStore');
var ParagraphStore = require('../stores/ParagraphStore.js');
var ParagraphActions = require("../actions/ParagraphActions.js")
var paragraph = React.createClass({

    getInitialState: function(){
        if(this.props.paragraph.active){
            this.handleClick();
        }        
   
        return {
            id: this.props.id,
            text: this.props.paragraph.text,
            active: this.props.paragraph.active,
            cursor: 0
        }
    },
    handleSave:function(id){},
    componentWillUnmount:function(){
          window.removeEventListener("keypress", this.handleKeyPress);
          window.removeEventListener("keydown", this.handleKeyDown)
    },
    handleClick: function(){
        ParagraphActions.setActive(this.props.paragraph)
        this.setState({cursor: 0});
        window.addEventListener("keypress", this.handleKeyPress)
        window.addEventListener("keydown", this.handleKeyDown)
        console.log("YOYOYO")
    },
    onDropFocus: function(){
       
    },
    componentWillReceiveProps: function(nextProps){
        if (this.props.paragraph.active){
             this.setState({
                active: this.props.paragraph.active,
                id: this.props.id,
                text: this.props.paragraph.text,
                    })} else{
             this.setState({
                active: this.props.paragraph.active,
                id: this.props.id,
                text: this.props.paragraph.text,
                    })
        }
    },

    handleKeyPress: function(e){
       // console.log(String.fromCharCode(e.keyCode))
       if (this.props.paragraph.active){
      var _t = this.props.paragraph.text
      var _nt = _t.slice(0, this.state.cursor) + String.fromCharCode(e.keyCode) + _t.slice(this.state.cursor);
      var _c = this.state.cursor + 1;
      this.setState({cursor: _c})
      this.props.paragraph.text = _nt
      console.log(this.props)
      ParagraphActions.editParagraph(this.props.paragraph);
  }

      //this.props.onSave(this.props.note_id);
    },
    handleKeyDown: function(e){
        console.log(e.keyCode);

        switch (e.keyCode){
            case 8:
            /*BACKSPACE*/
                if (this.props.paragraph.active){
                    if (window.getSelection()){
                       // console.log(window.getSelection())
                    }
                    console.log(this);
                    if(this.state.cursor > 0 && this.props.paragraph.text !== ""){
                        var _t = this.props.paragraph.text
                        var _nt = _t.slice(0, this.state.cursor - 1) + _t.slice(this.state.cursor);
                        var _c = this.state.cursor - 1;
                        this.setState({cursor: _c})
                        this.props.paragraph.text = _nt;
                        ParagraphActions.editParagraph(this.props.paragraph)
                    }else if (this.state.cursor === 0) {
                        console.log("delete")
                        ParagraphActions.deleteParagraph(this.props.paragraph);
                    }   
                }
                e.preventDefault();
                break;
             case 37:
                if (this.state.cursor > 0 && this.props.paragraph.active){
                    var _c  = this.state.cursor - 1;
                    this.setState({cursor: _c})
                } 
                e.preventDefault();

                break;
            case 39:
                if (this.state.cursor < this.state.text.length && this.props.paragraph.active){
                    var _c  = this.state.cursor + 1;
                    this.setState({cursor: _c})
                }
                e.preventDefault();

                break;
            case 32: 
            if (this.props.paragraph.active){
                var _t = this.props.paragraph.text
                var _nt = _t.slice(0, this.state.cursor) + ' ' + _t.slice(this.state.cursor);
                var _c = this.state.cursor + 1;
                this.setState({cursor: _c})
                this.props.paragraph.text = _nt;
                ParagraphActions.editParagraph(this.props.paragraph)
            }
                e.preventDefault();
                break;
            case 13:
            /*ENTER*/

            if (this.props.paragraph.active){
                var _p = {
                    _id:Date.now(),
                    active:true,
                    text: '',
                    note_id:this.props.note_id  
                };
                console.log(_p);
                this.props.paragraph.active = false;
                ParagraphActions.editParagraph(this.props.paragraph)
                ParagraphActions.insertParagraph(_p, this.props.paragraph);
            }
                break;
            case "default":
                break;
        };
    

    },

    render: function(){
        var _c = this.state.cursor;
        var _t = this.props.paragraph.text;
        var highlighted= _t[_c];
        
        var text = {__html: _t}
        if(!_t[_c]){
            highlighted = "_";
        }
        if (this.state.active){
        text = {__html:_t.slice(0, _c ) + "<span class='yellow'>" +highlighted +"</span>" + _t.slice(_c+1)};
        }
        return (
            <p className="paragraph" onClick={this.handleClick} dangerouslySetInnerHTML={text}></p>
            )
    }
})

module.exports = paragraph


