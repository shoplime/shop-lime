import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { GridLoader } from 'react-spinners';
import Dropzone from 'react-dropzone';





class AddHeroImage extends Component {
  render() {
    const { getSignedRequestFn, isUploading } = this.props
    return (
      
      
        
        <Dropzone 
                onDropAccepted={getSignedRequestFn}
                style={{
                  height: 200,
                    borderWidth: 7,
                    marginTop: 100,
                    borderColor: 'rgb(102, 102, 102)',
                      position: 'relative',
                    width: 200,
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 28,
                  }}
                  accept="image/*"
                  multiple={false}
                >

                {({getRootProps}) => (
                  <div {...getRootProps()}>
                    {isUploading ? <GridLoader 
                    /> : <p>Drop Hero Image Here</p>}
                  </div>
                )}
              </Dropzone>
              
              
      
    )
  }
}



export default AddHeroImage;