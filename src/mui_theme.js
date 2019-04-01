import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';


export default createMuiTheme({
    palette: {
        primary: green,
        secondary: {
            main: '#fafafa',
            // main: '#66bb6a',
            light: '#fafafa'
        },
        text: {
            primary: "#388e3c"
            // primary: "#fafafa"
            
        },
        common: {
            black: "#000"
        }
        
    },
    typography: {
        fontFamily: [
            'Montserrat'
            ].join(','),
        h5: {
            fontWeight: 900,
            letterSpacing: '1.2px'
            // padding: '0 20%'
        },
           
        useNextVariants: true
        
    },
    props: {
        // Name of the component ⚛️
        MuiTypography: {
            // The properties to apply
            variant: 'h1', // No more ripple, on the whole application 💣!
        },
    },
    
});
