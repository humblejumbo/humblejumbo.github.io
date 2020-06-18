var btn=document.getElementById('switch-btn');
var heading=document.getElementById('heading');
btn.addEventListener('click',function()
{
    btn.classList.toggle('trans');
    document.body.classList.toggle('chng');
    heading.classList.toggle('chng2')
    
})