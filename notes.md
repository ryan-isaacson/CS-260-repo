# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 3.234.218.17
Initially there was an issue with my instance that I couldn't figure out how to fix causing the site to stop working every few hours until I restarted it, so I had to stop and relaunch my instance causing me to have a new IP address. After that it worked as intended.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

I ran my notes through chatGBT for formatting so it would look how I wanted it to

```
HTML things I learned:
<head> = The name that shows up on the actual tab of the website
<body> = Contains almost everything else on the website including:
      <nav>
      <header>
      <main>
      <footer>
<h1> = Big header
<h2> = Next big header
<ul> = Creates a bulleted list
      <li> = List item
<a> = Makes links, example: <a href="index.html">Home</a>
<hr> = Makes a line across the screen separating sections
<table> = Makes a table structure
      <tr> = Table row
            <th> = Table header cell
            <td> = Table data cell
<button> = Makes a button
<p> = Regular text
<br> = Line break
<div> = Generic container (Put these things in the same box)
<svg> = Helps make pictures
```


## CSS

CSS took me a very long time to complete. I struggled a lot with trying to get things exactly how I wanted it, but ultimately I am very satasfied with how it turned out.

Bootstrap is cool, it's very nice on a surface level application to do things easy and quick.


## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
