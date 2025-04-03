
const userModel = require('../model/user')

test('test for elements in page' , async()=>{
    const ele = await global.page.$eval('a[href="/signup"]' ,(ele)=> ele.innerHTML )
    expect(ele).toBe('Signup')
})

test('signup_flow' ,async()=>{
    await page.click('a[href="/signup"]')
    const checkSignup = await page.$('input[name="username"]')
    expect(checkSignup).not.toBeNull()
    if(checkSignup){
        await page.type('input[name=username]', 'vtsh1995@gmail.com')
        await page.type('input[name=password]', 'Mypassword')
        await page.click('button[type=submit]')
        await userModel.create({username : 'vtsh1995@gmail.com' , password: 'Mypassword' })
        await page.waitForNavigation()
        expect(page.url()).toBe('http://localhost:2000/login')
        const findUser= await userModel.findOne({username :'vtsh1995@gmail.com'})
        expect(findUser.username).toMatch(/vtsh1995@gmail.com/)
    }
})
