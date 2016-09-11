### 属性

<div class="props">
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="hasimagefortag"></a><span class="methodType">static </span>hasImageForTag<span
            class="methodType">(uri, callback)</span> <a class="hash-link"
                                                         href="#hasimagefortag">#</a></h4>
        <div><p>检查ImageStore中是否包含了指定URI的图片数据。目前仅限iOS。</p></div>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="removeimagefortag"></a><span class="methodType">static </span>removeImageForTag<span
            class="methodType">(uri)</span> <a class="hash-link" href="#removeimagefortag">#</a></h4>
        <div><p>从ImageStore中删除指定图片。存储在ImageStore中的图标必须手动删除，否则在应用退出之前将会一直占用内存。调用此删除方法并不需要先调用<code>hasImageForTag()</code>方法来检查，此方法会自动处理异常情况。目前仅限iOS。</p></div>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="addimagefrombase64"></a><span class="methodType">static </span>addImageFromBase64<span
            class="methodType">(base64ImageData, success, failure)</span> 
            <a class="hash-link" href="#addimagefrombase64">#
            </a>
        </h4>
        <div><p>Stores a base64-encoded image in the ImageStore, and returns a URI that
            can be used to access or display the image later. Images are stored in
            memory only, and must be manually deleted when you are finished with
            them by calling <code>removeImageForTag()</code>.</p>
            <p>Note that it is very inefficient to transfer large quantities of binary
                data between JS and native code, so you should avoid calling this more
                than necessary.
                @platform ios</p></div>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="getbase64fortag"></a><span class="methodType">static </span>getBase64ForTag<span
            class="methodType">(uri, success, failure)</span> 
            <a class="hash-link" href="#getbase64fortag">#</a>
        </h4>
        <div><p>Retrieves the base64-encoded data for an image in the ImageStore. If the
            specified URI does not match an image in the store, the failure callback
            will be called.</p>
            <p>Note that it is very inefficient to transfer large quantities of binary
                data between JS and native code, so you should avoid calling this more
                than necessary. To display an image in the ImageStore, you can just pass
                the URI to an <code>&lt;Image/&gt;</code> component; there is no need to retrieve the
                base64 data.</p></div>
        </div>
</div>

