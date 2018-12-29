# Stickjaw

![Stickjaw logo](https://xakplant.ru/wp-content/uploads/2018/08/xakpl_stickjaw1.png)

Stickjaw is a small JS library for managing the proportions of blocks relative to each other. Thanks to the Stickjaw, you can make the width of a block equal to the height and back, set proportions, or make a size relative to another block. If you ever set a goal to make some html-block on the width or height of another one, or to make the height and width of the block the same, then you know that it is not always  possible and you have to spend  a lot of time on it. (javascript-library for controlling sizes, their proportionality).

[Examples](https://xakplant.ru/stickjaw/)

## Installation and Initialization 

Firstly download Stickjaw to your project folder and plug into the footer.

Then, after connecting Stickjaw, you need to create a new script and declare an object with options. 

```JS
<script>
    var SJ_setiings = {
                options: {
                    hlw: true, // Height as width
                    wlh: true, // Width as height
                    hlt: true, // Width of the target element (target id is the same as for height)
                    wlt: true, // Height of the target element (target id is the same as for width)
                    alo: true, // All elements as one (height)
                },
                settings: {
                    windowResize: true, 
                    writeHystory: true 
                }
            }
    var sj = new SJ(SJ_setiings);
</script>
```

You cannot declare the object SJ_settings and instead of the previous call to use this: 


```JS
<script>
    var sj = new SJ();
</script>
```

Be careful. If you use that call, Stickjaw does not respond to screen resizing. If you still want Stickjaw to work on changing the screen size then use this call:
 ```JS
 var sj = new SJ({
                settings: {
                    windowResize: true
                }
            });
```

## Using

Stickjaw is easy to use. You should just add the corresponding attribute.

### Height as width
You should add this attribute in order to make the block height equal to its width:

> data-proportion-h="1"

```
<div data-proportion-h="1">your content</div>
```
If you want to make your block equal to the width * 2, then you simply should change the attribute value to 2:
```
<div data-proportion-h="2">your content</div>
```

### Width as height

You should add this attribute to your block in order to make a block width equal to its height:

> data-proportion-w="1"

```
<div data-proportion-w="1">your content</div>
```

If you want to make your block equal to the height * 2, then you simply should change the attribute value to 2:

```
<div data-proportion-w="2">your content</div>
```

### Make the height same as another block has

To do this, you need to set the element identifier relative to which you want to set the height of your block. After that you need to add attributes to your block:

> data-proportion-targer-h="1" data-proportion-target="targetID"

targetID is the item identifier relative to which you want to set the height.

Example:

```HTML

<div data-proportion-targer-h="1" data-proportion-target="targetID" style="width:120px; background:#333;"></div>

<div id="targetID" height="100px"></div>
```

### Make the width same as another block has

To do this, you need to specify the identifier of the element for which you want to set the width of your block. After that you need to add attributes to your block:

> data-proportion-targer-w="1" data-proportion-target="targetID"

targetID is the item identifier relative to which you want to set the height.

Example:

```HTML

<div data-proportion-targer-w="1" data-proportion-target="targetID" style="height:120px; background:#333;"></div>

<div id="targetID" width="100px"></div>

```

#### Separate target elements at height and width

If you use:
>data-proportion-targer-w="1" data-proportion-targer-w="1" data-proportion-target="targetID"

then the element will be the same size as the targetID. But what should you do if the height should be equal to one element, and the width to another? Use these selectors for the width: 
>data-proportion-targer-ow="1" data-proportion-target-ow="targetIdOW"

And for height you can use:
>data-proportion-targer-oh="1" data-proportion-target-oh="targetIdOH"



### How to make the height of all elements the same

Stickjaw can do the same height of all blocks in the parent block. To do this, you need to specify in the attributes of the parent block: 

In case "children" blocks don't have hierarchy
>data-parent-alo="default"

Example:

```HTML

<div data-parent-alo="default">
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
</div>


```

If children have many levels of hierarchy, you need to specify a chain of selectors after the parent including selectors of children.

Example:

```HTML
<div class="row" data-parent-alo=".col-lg-6 .card">
    <div class="col-lg-6">
        <div class="card">content 1</div>
    </div>
    <div class="col-lg-6">
        <div class="card">content 2</div>
    </div>
    <div class="col-lg-6">
        <div class="card">content 3</div>
    </div>
</div>
```
>data-parent-alo="selector chain after parent including child selector"

## The order of execution of instructions in Stickjaw

In Stickjaw there is an order of execution of instructions, therefore the sizes of blocks will be executed in a certain order.
```HTML
1. hlw // Height as width
2. wlh // Width as height
3. hlt // Height of the target element (target id is the same as for width)
4. wlt // Width of the target element (target id is the same as for height)
5. ohlt // Height of the target element (target id is separate with width)
6. owlt // Width of the target element (target id is separate with height)
7. alo // All elements as one
```

It can be a reason of certain inconveniences. Sometimes you need to specify a specific sequence. So there is a method SJ.loop ();

### loop()

This method takes an array with objects. Objects have the following structure:

```HTML
{
  method: 'hlw',              // The method that we will apply to the element
  currentTarget: 'elemetId',  // The element id to convert
  proportion: 2,              // Proportionality 
  target: 'targetId'          // The id of the element we are trying to look like (необязательный для методов hlw и wlt)
}
```

#### Usage example

```HTML
SJ.loop([{
    method: 'wlt',
    currentTarget: 'myCurTarget',
    proportion: 1,
    target: 'myTargetId'
}]);
```

You can add as many elements as you want. In this case, they will be performed in turn.

#### Available methods for .loop()

```html
hlw 
wlh 
hlt 
wlt 
```

The .loop () method is quite interesting. You can make a progressbar, for example, using it. In this case, the target id will be the parent element to which our element grows. Something like that is in the file demo.html

### History

In version 0.4.0, a record of the usage history of Stickjaw appeared. To enable history saving, you must add to the settings object 

>writeHystory: true

#### Example

```HTML
new SJ(
    settings: {
        windowResize: true, 
        writeHystory: true // write hystory
    }
);

```


## PS

I hope you find my library useful.
