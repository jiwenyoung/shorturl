const { Command } = require('commander')
const axios = require('axios')
const isUrlHttp = require('is-url-http')
const chalk = require('chalk')

const main = async () => {
  try{
    const program = new Command();
    program.version('1.0.0');
  
    const isUrlOk = (url)=>{
      if(isUrlHttp(url)){
        return url
      }else{
        throw new Error('URL Invalid')
      }
    }
    program.argument('<url>', 'The URL that will be shorted', isUrlOk)
    program.action(async (url)=>{
      url = encodeURIComponent(url)
      url = `https://api.shrtco.de/v2/shorten?url=${url}`
      let response = await axios.get(url)
      let result = response.data.result
      let shortlinks = [
        result.full_short_link,
        result.full_short_link2,
        result.full_short_link3
      ]
  
      for(let link of shortlinks){
        console.log(chalk.green.bold('Short Link: ') + chalk.bold(` ${link}`))
      }
    })
    await program.parseAsync(process.argv)
  }catch(error){
    console.error(error.message)
  }
}

main()