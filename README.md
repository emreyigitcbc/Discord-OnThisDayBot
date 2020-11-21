![version](https://badgen.net/badge/version/1.0/green)
![discord.js](https://badgen.net/badge/discord.js/v12/yellow)
# Discord "On This Day" Bot

Discord OTD bot is for fetching the events, births and deaths on that day from wikipedia.

## Installation

It needs latest version of Node.js


```bash
npm i discord.js
npm i wikijs
```

## Usage
The default command is `.otd` and sending the specific channel is off, so if admin (who has the admin role specified in `config.json` as `admin_role_id`) types `.otd` then it sends the events, births and deaths on same channel but you can change it to specific channel you just need to make true `"one_channel"` and replace `"channel_id"` with the channel id which channel you want.

If you want to use it in different languages, I commented all over the code. Actually, It is a little hard to implement other languages because of Wikipedia. Wikipedia has different pages for On This Day in other languages.

For using in other languages, you must change `wikipedia_api_url` in config.json and more...

- You have to check if `wikidate` variable is correct as wikipedia want! (For English it is November_20 but in Turkish it is 20_Kasım; you have to change `lang` section in config.json for changing the months but be sure wikipedia uses them too!)
- You have to check if `page_tag` variable is correct as wikipedia want! (For English it is November_20 but in Turkish it is Şablon:Tarihte_bugün/20_Kasım; you may need to edit this.)
- The line breaks may be bugged in some languages, you may need to edit `wikicontent` variable like this, `wikicontent.replace("Deaths", "\nDeaths")` (Turkish is also buggy, but I added a comment line to fix this)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
