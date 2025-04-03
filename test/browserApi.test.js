describe( 'test browser api',()=>{
    beforeEach(async ()=>{
        await global.page.goto('http://localhost:2000/fetch-post')
    })
 test(' GET check browser API', async ()=>{
    const response =await  global.page.evaluate( async ()=>{

         const apiResponse =await fetch('http://localhost:2000/fetch-post',{
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        console.log(apiResponse ,"please")
        const data = await apiResponse.json()
        console.log(data ,"my response new")
        return data
    })
    console.log(response.posts ,"my response")
    expect(response.posts.length).toBeGreaterThan(0)

 })
})