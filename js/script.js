var ColourRow = React.createClass({
    getHex: function () {
        var num = this.props.colour.red * 0x10000 + this.props.colour.green * 0x100 + this.props.colour.blue;
        var str = num.toString(16);
        return '#' + '000000'.slice(str.length) + str;
    },

    onChange: function () {

    },

    onClickColour: function () {
        this.props.setBackground(this.props.colour);
    },

    onClickRemove: function () {
        this.props.removeColour(this.props.index);
    },

    render: function () {
        var colour = this.props.colour;
        var colourStyle = {background: 'rgb(' + colour.red + ', ' + colour.green + ', ' + colour.blue + ')'};

        return (
            <li>
                <div className='control left'><a className='handle' title='Move up/down'>░</a></div>
                <div className='colour'><button title='Set background to {colour.name}' onClick={this.onClickColour} style={colourStyle}></button></div>
                <div className='name'><input type='text' maxlength='50' value={colour.name} onChange={this.onChange} /></div>
                <div className='hex'><input type='text' maxlength='7' value={this.getHex()} onChange={this.onChange} /></div>
                <div className='numbers'>
                    <div className='number'><input type='text' maxlength='3' value={colour.red} data-range='255' onChange={this.onChange} /></div>
                    <div className='number'><input type='text' maxlength='3' value={colour.green} data-range='255' onChange={this.onChange} /></div>
                    <div className='number'><input type='text' maxlength='3' value={colour.blue} data-range='255' onChange={this.onChange} /></div>
                </div>
                <div className='numbers'>
                    <div className='number'><input type='text' maxlength='3' value={colour.hue} data-range='359' onChange={this.onChange} /></div>
                    <div className='number'><input type='text' maxlength='3' value={colour.sat} data-range='100' onChange={this.onChange} /></div>
                    <div className='number'><input type='text' maxlength='3' value={colour.val} data-range='100' onChange={this.onChange} /></div>
                </div>
                <div className='colour'><button title='Set background to {colour.name}' onClick={this.onClickColour} style={colourStyle}></button></div>
                <div className='control right'><a className='delete' title='Remove' onClick={this.onClickRemove}>✕</a></div>
            </li>
        );
    }
});

var ColourList = React.createClass({
    getInitialState: function () {
        return {
            background: {red: 255, green: 255, blue: 255, hue: 0, sat: 0, val: 100},
            colours: []
        };
    },

    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({colours: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    setBackground: function (colour) {
        this.setState({background: colour});
    },

    removeColour: function (index) {
        var newColours = this.state.colours;
        newColours.splice(index, 1);
        this.setState({
            colours: newColours
        });
    },

    getClass: function () {
        return this.state.background.val > 35 ? 'light' : 'dark';
    },

    render: function () {
        var background = this.state.background;
        var backgroundStyle = {background: 'rgb(' + background.red + ', ' + background.green + ', ' + background.blue + ')'};

        var rows = this.state.colours.map(function (colour, i) {
            return (
                <ColourRow key={i} index={i} colour={colour} setBackground={this.setBackground} removeColour={this.removeColour} />
            );
        }.bind(this));

        return (
            <main className={this.getClass()} style={backgroundStyle}>
                <header>
                    <div className='name'>Name</div>
                    <div className='hex'>Hex</div>
                    <div className='numbers'>RGB</div>
                    <div className='numbers'>HSV</div>
                </header>
                <ul>
                    {rows}
                </ul>
            </main>
        );
    }
});

$(function () {
    ReactDOM.render(<ColourList url='./colours.json' />, document.getElementById('colours'));
});
