import { CircularProgress, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./app.css";

const App = () => {

    const [cityName, setCityName] = useState("Lagos");
    const [inputText, setInputText] = useState("");
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [Loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch( `https://api.weatherapi.com/v1/current.json?key=0bd1e6d3f9674870a36135614232604&q=${cityName}&aqi=no`
        )
        .then((res)=>{
            if(res.status === 200){
             error && setError(false);
             return res.json();
           
            }else{
                throw new Error("Something went wrong")
            }
        })
        .then((data)=>{
           console.log(data);
            setData(data);
        })
        .catch(()=>setError(true))
        .finally(()=>setLoading(false));
    }, [cityName, error]);

    const handleSearch = (e) =>{
        if(e.key === "Enter"){
            setCityName(e.target.value);
            setInputText("");
        }
    };

  return (
    <div className="bg_img">
        {!Loading ? (
            <>
            <TextField
            variant="filled"
            label="Search Location"
            className="input"
            error={error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSearch}
            />
            <h1 className="city">{data.location.name}</h1>
            <h1>{data.current.condition.text}</h1>
            <div className="group">
            
            </div>
            <h1>{data.current.temp_f} f</h1>
            <Slide direction="right" timeout={800} in={!Loading}>
                <div className="box-container">
                    <div className="box">
                        <p>Humidity</p>
                        <h1>{data.current.humidity}%</h1>
                    </div>
                    <div className="box">
                        <p>Wind</p>
                        <h1>{data.current.temp_f}%</h1>
                    </div>
                    <div className="box">
                        <p>Feels Like</p>
                        <h1>{data.current.feelslike_f} f</h1>
                    </div>
                </div>
            </Slide>

         
       
            </>
        ):(<CircularProgress/>)
        }
    </div>
  );
}
export default App