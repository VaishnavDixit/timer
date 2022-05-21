var elemDiv = document.createElement('div');
elemDiv.style.cssText = 'position:static;width:100%;height:20px;background:#ABCD33;';elemDiv
document.body.prepend(elemDiv);
undefined
elemDiv.innerHTML='<div style="float: left;height: 20px; background-color:bisque;width:30%;"></div><div style="float: right;height: 20px; background-color:blueviolet;width:70%;"></div>';
'<div style="float: left;height: 20px; background-color:bisque;width:30%;"></div><div style="float: right;height: 20px; background-color:blueviolet;width:70%;"></div>'