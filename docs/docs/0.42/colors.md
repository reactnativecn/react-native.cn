以下这些格式的颜色代码都是支持的：

 - `'#f0f'` (#rgb)
 - `'#f0fc'` (#rgba)
 - `'#ff00ff'` (#rrggbb)
 - `'#ff00ff00'` (#rrggbbaa)
 - `'rgb(255, 255, 255)'`
 - `'rgba(255, 255, 255, 1.0)'`
 - `'hsl(360, 100%, 100%)'`
 - `'hsla(360, 100%, 100%, 1.0)'`
 - `'transparent'`
 - `'red'`
 - `0xff00ff00` (0xrrggbbaa)

对于有称谓的颜色，React Native遵循的是[CSS3的规范](http://www.w3.org/TR/css3-color/#svg-color):

<ul>
    <li><span class="color" style="background-color:aliceblue;"></span> aliceblue (#f0f8ff)</li>
    <li><span class="color" style="background-color:antiquewhite;"></span> antiquewhite (#faebd7)</li>
    <li><span class="color" style="background-color:aqua;"></span> aqua (#00ffff)</li>
    <li><span class="color" style="background-color:aquamarine;"></span> aquamarine (#7fffd4)</li>
    <li><span class="color" style="background-color:azure;"></span> azure (#f0ffff)</li>
    <li><span class="color" style="background-color:beige;"></span> beige (#f5f5dc)</li>
    <li><span class="color" style="background-color:bisque;"></span> bisque (#ffe4c4)</li>
    <li><span class="color" style="background-color:black;"></span> black (#000000)</li>
    <li><span class="color" style="background-color:blanchedalmond;"></span> blanchedalmond (#ffebcd)</li>
    <li><span class="color" style="background-color:blue;"></span> blue (#0000ff)</li>
    <li><span class="color" style="background-color:blueviolet;"></span> blueviolet (#8a2be2)</li>
    <li><span class="color" style="background-color:brown;"></span> brown (#a52a2a)</li>
    <li><span class="color" style="background-color:burlywood;"></span> burlywood (#deb887)</li>
    <li><span class="color" style="background-color:cadetblue;"></span> cadetblue (#5f9ea0)</li>
    <li><span class="color" style="background-color:chartreuse;"></span> chartreuse (#7fff00)</li>
    <li><span class="color" style="background-color:chocolate;"></span> chocolate (#d2691e)</li>
    <li><span class="color" style="background-color:coral;"></span> coral (#ff7f50)</li>
    <li><span class="color" style="background-color:cornflowerblue;"></span> cornflowerblue (#6495ed)</li>
    <li><span class="color" style="background-color:cornsilk;"></span> cornsilk (#fff8dc)</li>
    <li><span class="color" style="background-color:crimson;"></span> crimson (#dc143c)</li>
    <li><span class="color" style="background-color:cyan;"></span> cyan (#00ffff)</li>
    <li><span class="color" style="background-color:darkblue;"></span> darkblue (#00008b)</li>
    <li><span class="color" style="background-color:darkcyan;"></span> darkcyan (#008b8b)</li>
    <li><span class="color" style="background-color:darkgoldenrod;"></span> darkgoldenrod (#b8860b)</li>
    <li><span class="color" style="background-color:darkgray;"></span> darkgray (#a9a9a9)</li>
    <li><span class="color" style="background-color:darkgreen;"></span> darkgreen (#006400)</li>
    <li><span class="color" style="background-color:darkgrey;"></span> darkgrey (#a9a9a9)</li>
    <li><span class="color" style="background-color:darkkhaki;"></span> darkkhaki (#bdb76b)</li>
    <li><span class="color" style="background-color:darkmagenta;"></span> darkmagenta (#8b008b)</li>
    <li><span class="color" style="background-color:darkolivegreen;"></span> darkolivegreen (#556b2f)</li>
    <li><span class="color" style="background-color:darkorange;"></span> darkorange (#ff8c00)</li>
    <li><span class="color" style="background-color:darkorchid;"></span> darkorchid (#9932cc)</li>
    <li><span class="color" style="background-color:darkred;"></span> darkred (#8b0000)</li>
    <li><span class="color" style="background-color:darksalmon;"></span> darksalmon (#e9967a)</li>
    <li><span class="color" style="background-color:darkseagreen;"></span> darkseagreen (#8fbc8f)</li>
    <li><span class="color" style="background-color:darkslateblue;"></span> darkslateblue (#483d8b)</li>
    <li><span class="color" style="background-color:darkslategray;"></span> darkslategray (#2f4f4f)</li>
    <li><span class="color" style="background-color:darkslategrey;"></span> darkslategrey (#2f4f4f)</li>
    <li><span class="color" style="background-color:darkturquoise;"></span> darkturquoise (#00ced1)</li>
    <li><span class="color" style="background-color:darkviolet;"></span> darkviolet (#9400d3)</li>
    <li><span class="color" style="background-color:deeppink;"></span> deeppink (#ff1493)</li>
    <li><span class="color" style="background-color:deepskyblue;"></span> deepskyblue (#00bfff)</li>
    <li><span class="color" style="background-color:dimgray;"></span> dimgray (#696969)</li>
    <li><span class="color" style="background-color:dimgrey;"></span> dimgrey (#696969)</li>
    <li><span class="color" style="background-color:dodgerblue;"></span> dodgerblue (#1e90ff)</li>
    <li><span class="color" style="background-color:firebrick;"></span> firebrick (#b22222)</li>
    <li><span class="color" style="background-color:floralwhite;"></span> floralwhite (#fffaf0)</li>
    <li><span class="color" style="background-color:forestgreen;"></span> forestgreen (#228b22)</li>
    <li><span class="color" style="background-color:fuchsia;"></span> fuchsia (#ff00ff)</li>
    <li><span class="color" style="background-color:gainsboro;"></span> gainsboro (#dcdcdc)</li>
    <li><span class="color" style="background-color:ghostwhite;"></span> ghostwhite (#f8f8ff)</li>
    <li><span class="color" style="background-color:gold;"></span> gold (#ffd700)</li>
    <li><span class="color" style="background-color:goldenrod;"></span> goldenrod (#daa520)</li>
    <li><span class="color" style="background-color:gray;"></span> gray (#808080)</li>
    <li><span class="color" style="background-color:green;"></span> green (#008000)</li>
    <li><span class="color" style="background-color:greenyellow;"></span> greenyellow (#adff2f)</li>
    <li><span class="color" style="background-color:grey;"></span> grey (#808080)</li>
    <li><span class="color" style="background-color:honeydew;"></span> honeydew (#f0fff0)</li>
    <li><span class="color" style="background-color:hotpink;"></span> hotpink (#ff69b4)</li>
    <li><span class="color" style="background-color:indianred;"></span> indianred (#cd5c5c)</li>
    <li><span class="color" style="background-color:indigo;"></span> indigo (#4b0082)</li>
    <li><span class="color" style="background-color:ivory;"></span> ivory (#fffff0)</li>
    <li><span class="color" style="background-color:khaki;"></span> khaki (#f0e68c)</li>
    <li><span class="color" style="background-color:lavender;"></span> lavender (#e6e6fa)</li>
    <li><span class="color" style="background-color:lavenderblush;"></span> lavenderblush (#fff0f5)</li>
    <li><span class="color" style="background-color:lawngreen;"></span> lawngreen (#7cfc00)</li>
    <li><span class="color" style="background-color:lemonchiffon;"></span> lemonchiffon (#fffacd)</li>
    <li><span class="color" style="background-color:lightblue;"></span> lightblue (#add8e6)</li>
    <li><span class="color" style="background-color:lightcoral;"></span> lightcoral (#f08080)</li>
    <li><span class="color" style="background-color:lightcyan;"></span> lightcyan (#e0ffff)</li>
    <li><span class="color" style="background-color:lightgoldenrodyellow;"></span> lightgoldenrodyellow (#fafad2)</li>
    <li><span class="color" style="background-color:lightgray;"></span> lightgray (#d3d3d3)</li>
    <li><span class="color" style="background-color:lightgreen;"></span> lightgreen (#90ee90)</li>
    <li><span class="color" style="background-color:lightgrey;"></span> lightgrey (#d3d3d3)</li>
    <li><span class="color" style="background-color:lightpink;"></span> lightpink (#ffb6c1)</li>
    <li><span class="color" style="background-color:lightsalmon;"></span> lightsalmon (#ffa07a)</li>
    <li><span class="color" style="background-color:lightseagreen;"></span> lightseagreen (#20b2aa)</li>
    <li><span class="color" style="background-color:lightskyblue;"></span> lightskyblue (#87cefa)</li>
    <li><span class="color" style="background-color:lightslategray;"></span> lightslategray (#778899)</li>
    <li><span class="color" style="background-color:lightslategrey;"></span> lightslategrey (#778899)</li>
    <li><span class="color" style="background-color:lightsteelblue;"></span> lightsteelblue (#b0c4de)</li>
    <li><span class="color" style="background-color:lightyellow;"></span> lightyellow (#ffffe0)</li>
    <li><span class="color" style="background-color:lime;"></span> lime (#00ff00)</li>
    <li><span class="color" style="background-color:limegreen;"></span> limegreen (#32cd32)</li>
    <li><span class="color" style="background-color:linen;"></span> linen (#faf0e6)</li>
    <li><span class="color" style="background-color:magenta;"></span> magenta (#ff00ff)</li>
    <li><span class="color" style="background-color:maroon;"></span> maroon (#800000)</li>
    <li><span class="color" style="background-color:mediumaquamarine;"></span> mediumaquamarine (#66cdaa)</li>
    <li><span class="color" style="background-color:mediumblue;"></span> mediumblue (#0000cd)</li>
    <li><span class="color" style="background-color:mediumorchid;"></span> mediumorchid (#ba55d3)</li>
    <li><span class="color" style="background-color:mediumpurple;"></span> mediumpurple (#9370db)</li>
    <li><span class="color" style="background-color:mediumseagreen;"></span> mediumseagreen (#3cb371)</li>
    <li><span class="color" style="background-color:mediumslateblue;"></span> mediumslateblue (#7b68ee)</li>
    <li><span class="color" style="background-color:mediumspringgreen;"></span> mediumspringgreen (#00fa9a)</li>
    <li><span class="color" style="background-color:mediumturquoise;"></span> mediumturquoise (#48d1cc)</li>
    <li><span class="color" style="background-color:mediumvioletred;"></span> mediumvioletred (#c71585)</li>
    <li><span class="color" style="background-color:midnightblue;"></span> midnightblue (#191970)</li>
    <li><span class="color" style="background-color:mintcream;"></span> mintcream (#f5fffa)</li>
    <li><span class="color" style="background-color:mistyrose;"></span> mistyrose (#ffe4e1)</li>
    <li><span class="color" style="background-color:moccasin;"></span> moccasin (#ffe4b5)</li>
    <li><span class="color" style="background-color:navajowhite;"></span> navajowhite (#ffdead)</li>
    <li><span class="color" style="background-color:navy;"></span> navy (#000080)</li>
    <li><span class="color" style="background-color:oldlace;"></span> oldlace (#fdf5e6)</li>
    <li><span class="color" style="background-color:olive;"></span> olive (#808000)</li>
    <li><span class="color" style="background-color:olivedrab;"></span> olivedrab (#6b8e23)</li>
    <li><span class="color" style="background-color:orange;"></span> orange (#ffa500)</li>
    <li><span class="color" style="background-color:orangered;"></span> orangered (#ff4500)</li>
    <li><span class="color" style="background-color:orchid;"></span> orchid (#da70d6)</li>
    <li><span class="color" style="background-color:palegoldenrod;"></span> palegoldenrod (#eee8aa)</li>
    <li><span class="color" style="background-color:palegreen;"></span> palegreen (#98fb98)</li>
    <li><span class="color" style="background-color:paleturquoise;"></span> paleturquoise (#afeeee)</li>
    <li><span class="color" style="background-color:palevioletred;"></span> palevioletred (#db7093)</li>
    <li><span class="color" style="background-color:papayawhip;"></span> papayawhip (#ffefd5)</li>
    <li><span class="color" style="background-color:peachpuff;"></span> peachpuff (#ffdab9)</li>
    <li><span class="color" style="background-color:peru;"></span> peru (#cd853f)</li>
    <li><span class="color" style="background-color:pink;"></span> pink (#ffc0cb)</li>
    <li><span class="color" style="background-color:plum;"></span> plum (#dda0dd)</li>
    <li><span class="color" style="background-color:powderblue;"></span> powderblue (#b0e0e6)</li>
    <li><span class="color" style="background-color:purple;"></span> purple (#800080)</li>
    <li><span class="color" style="background-color:rebeccapurple;"></span> rebeccapurple (#663399)</li>
    <li><span class="color" style="background-color:red;"></span> red (#ff0000)</li>
    <li><span class="color" style="background-color:rosybrown;"></span> rosybrown (#bc8f8f)</li>
    <li><span class="color" style="background-color:royalblue;"></span> royalblue (#4169e1)</li>
    <li><span class="color" style="background-color:saddlebrown;"></span> saddlebrown (#8b4513)</li>
    <li><span class="color" style="background-color:salmon;"></span> salmon (#fa8072)</li>
    <li><span class="color" style="background-color:sandybrown;"></span> sandybrown (#f4a460)</li>
    <li><span class="color" style="background-color:seagreen;"></span> seagreen (#2e8b57)</li>
    <li><span class="color" style="background-color:seashell;"></span> seashell (#fff5ee)</li>
    <li><span class="color" style="background-color:sienna;"></span> sienna (#a0522d)</li>
    <li><span class="color" style="background-color:silver;"></span> silver (#c0c0c0)</li>
    <li><span class="color" style="background-color:skyblue;"></span> skyblue (#87ceeb)</li>
    <li><span class="color" style="background-color:slateblue;"></span> slateblue (#6a5acd)</li>
    <li><span class="color" style="background-color:slategray;"></span> slategray (#708090)</li>
    <li><span class="color" style="background-color:slategrey;"></span> slategrey (#708090)</li>
    <li><span class="color" style="background-color:snow;"></span> snow (#fffafa)</li>
    <li><span class="color" style="background-color:springgreen;"></span> springgreen (#00ff7f)</li>
    <li><span class="color" style="background-color:steelblue;"></span> steelblue (#4682b4)</li>
    <li><span class="color" style="background-color:tan;"></span> tan (#d2b48c)</li>
    <li><span class="color" style="background-color:teal;"></span> teal (#008080)</li>
    <li><span class="color" style="background-color:thistle;"></span> thistle (#d8bfd8)</li>
    <li><span class="color" style="background-color:tomato;"></span> tomato (#ff6347)</li>
    <li><span class="color" style="background-color:turquoise;"></span> turquoise (#40e0d0)</li>
    <li><span class="color" style="background-color:violet;"></span> violet (#ee82ee)</li>
    <li><span class="color" style="background-color:wheat;"></span> wheat (#f5deb3)</li>
    <li><span class="color" style="background-color:white;"></span> white (#ffffff)</li>
    <li><span class="color" style="background-color:whitesmoke;"></span> whitesmoke (#f5f5f5)</li>
    <li><span class="color" style="background-color:yellow;"></span> yellow (#ffff00)</li>
    <li><span class="color" style="background-color:yellowgreen;"></span> yellowgreen (#9acd32)</li>
</ul>
