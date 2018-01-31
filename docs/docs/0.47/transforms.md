### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="decomposedmatrix"></a>decomposedMatrix?: <span
            class="propType">DecomposedMatrixPropType</span> <a class="hash-link" href="#decomposedmatrix">#</a></h4>
        <div><p>Deprecated. Use the transform prop instead.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="transform"></a>transform?: <span
            class="propType"><span>[<span><span><span>{<span><span>perspective: number</span></span>}</span>, </span><span><span>{<span><span>rotate: string</span></span>}</span>, </span><span><span>{<span><span>rotateX: string</span></span>}</span>, </span><span><span>{<span><span>rotateY: string</span></span>}</span>, </span><span><span>{<span><span>rotateZ: string</span></span>}</span>, </span><span><span>{<span><span>scale: number</span></span>}</span>, </span><span><span>{<span><span>scaleX: number</span></span>}</span>, </span><span><span>{<span><span>scaleY: number</span></span>}</span>, </span><span><span>{<span><span>translateX: number</span></span>}</span>, </span><span><span>{<span><span>translateY: number</span></span>}</span>, </span><span><span>{<span><span>skewX: string</span></span>}</span>, </span><span>{<span><span>skewY: string</span></span>}</span></span>]</span></span>
        <a class="hash-link" href="#transform">#</a></h4>
        <div><p><code>transform</code> accepts an array of transformation objects. Each object specifies
            the property that will be transformed as the key, and the value to use in the
            transformation. Objects should not be combined. Use a single key/value pair
            per object.</p>
            <p>The rotate transformations require a string so that the transform may be
                expressed in degrees (deg) or radians (rad). For example:</p>
            <p><code>transform([{ rotateX: '45deg' }, { rotateZ: '0.785398rad' }])</code></p>
            <p>The skew transformations require a string so that the transform may be
                expressed in degrees (deg). For example:</p>
            <p><code>transform([{ skewX: '45deg' }])</code></p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="transformmatrix"></a>transformMatrix?: <span
            class="propType">TransformMatrixPropType</span> <a class="hash-link" href="#transformmatrix">#</a></h4>
        <div><p>Deprecated. Use the transform prop instead.</p></div>
    </div>
</div>