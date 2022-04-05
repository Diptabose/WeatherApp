import images from '../WeatherIcons';
function ImageMapper(icon){
    let ret=null;
    let arr= Object.entries(images);
    for(var i=0;i<arr.length;i++)
    {
      if(icon===arr[i][0])
      {
        ret=arr[i][1];
        break;
      }
    }
return ret;
}
export default ImageMapper;