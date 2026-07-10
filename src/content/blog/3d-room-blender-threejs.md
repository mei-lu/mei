---
title: 3D Isometric Room in Three.js and Blender
date: 11/26/25
category: Projects
description: I created a cute room from scratch, learning 3D modeling techniques, and how to create interactions with the objects on the browser.
---

## Scoping

I wanted to stick to furniture because they are less organic and easy to get into the flow for modeling. I made a lot of objects in a few sittings rather than overfixating on a few! There's a lot of flexibility in making a room and it's fun to reflect my interests through it. You can tell a lot about a person by observing their living space! A fun way to show not tell.

In order to keep the scope small, I did not plan for super fancy animations but I knew I wanted to incorporate one shader (for the water cup).

## Code and Optimization

Since I was building this for the browser, I baked in the lights. Basically, I put how the lights looked on the textures instead of calculating them in real time for better performance. That was the most headache inducing part of the project because in order to make it look good, everything has to line up perfectly. I probably re-exported 912837918.

It was satisfying to see each part of the texture map to the model and deciding how high quality they should be based on how much space they take up on the image file. In order to save space on my textures, I actually did not include UVs on the back of the house since there's not much to see there anyway. I was glad to make the trade-off for more high quality textures!

I found it really important to manage objects well in DCC software. Even though I don't plan to "maintain" this project necessarily, I still wanted the code to be clean and readable. With so many objects being configured on separate lines, it feels good for that to be in order.

## Conclusion

I found the Three.js part to be pretty intuitive, as aside from the boilerplate stuff, it was just one Typescript file. It gave me a feeling I really like of "let me tell the IDE what I want in code, and it appears". It's almost like being on a movie set where you can command everything!
