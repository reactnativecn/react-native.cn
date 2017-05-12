### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="setenabled"></a><span
            class="methodType">static </span>setEnabled<span class="methodType">(enabled)</span> <a class="hash-link"
                                                                                                    href="#setenabled">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="beginevent"></a><span
            class="methodType">static </span>beginEvent<span class="methodType">(profileName?, args?)</span> <a
            class="hash-link" href="#beginevent">#</a></h4>
        <div><p>beginEvent/endEvent for starting and then ending a profile within the same call stack frame</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="endevent"></a><span
            class="methodType">static </span>endEvent<span class="methodType">()</span> <a class="hash-link"
                                                                                            href="#endevent">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="beginasyncevent"></a><span class="methodType">static </span>beginAsyncEvent<span
            class="methodType">(profileName?)</span> <a class="hash-link"
                                                        href="#beginasyncevent">#</a></h4>
        <div><p>beginAsyncEvent/endAsyncEvent for starting and then ending a profile where the end can either
            occur on another thread or out of the current stack frame, eg await
            the returned cookie variable should be used as input into the endAsyncEvent call to end the profile</p>
        </div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="endasyncevent"></a><span
            class="methodType">static </span>endAsyncEvent<span class="methodType">(profileName?, cookie?)</span> <a
            class="hash-link" href="#endasyncevent">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="counterevent"></a><span
            class="methodType">static </span>counterEvent<span class="methodType">(profileName?, value?)</span> <a
            class="hash-link" href="#counterevent">#</a></h4>
        <div><p>counterEvent registers the value to the profileName on the systrace timeline</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="attachtorelayprofiler"></a><span
            class="methodType">static </span>attachToRelayProfiler<span class="methodType">(relayProfiler)</span> <a
            class="hash-link" href="#attachtorelayprofiler">#</a></h4>
        <div><p>Relay profiles use await calls, so likely occur out of current stack frame
            therefore async variant of profiling is used</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="swizzlejson"></a><span
            class="methodType">static </span>swizzleJSON<span class="methodType">()</span> <a class="hash-link"
                                                                                               href="#swizzlejson">#</a>
    </h4>
        <div><p>This is not called by default due to perf overhead but it's useful
            if you want to find traces which spend too much time in JSON.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="measuremethods"></a><span class="methodType">static </span>measureMethods<span
            class="methodType">(object, objectName, methodNames)</span> <a class="hash-link"
                                                                           href="#measuremethods">#</a>
    </h4>
        <div><p>Measures multiple methods of a class. For example, you can do:
            Systrace.measureMethods(JSON, 'JSON', ['parse', 'stringify']);</p>
            <p>@param object
                @param objectName
                @param methodNames Map from method names to method display names.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="measure"></a><span
            class="methodType">static </span>measure<span class="methodType">(objName, fnName, func)</span> <a
            class="hash-link" href="#measure">#</a></h4>
        <div><p>Returns an profiled version of the input function. For example, you can:
            JSON.parse = Systrace.measure('JSON', 'parse', JSON.parse);</p>
            <p>@param objName
                @param fnName
                @param {function} func
                @return {function} replacement function</p></div>
    </div>
</div>

