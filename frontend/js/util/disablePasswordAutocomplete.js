import React from "react";

export default React.createClass({
	render() {
		return <div style={{display: "none"}}>
			<input type="text" id="user" />
			<input type="password" id="password" />
		</div>;
	}
});
