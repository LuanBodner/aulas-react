import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

export function UploadImage() {
  const uploadFile: any = useRef();
  const [images, setImages] = useState<Array<string>>();

  function openFileExplorer() {
    uploadFile.current.click();
  }

  function handleFile(event: any) {
    console.log(event.target.files);
    parseFileToBase64(event.target.files);
  }

  function parseFileToBase64(files: Array<File>) {
    const parsedFiles: Array<string> = new Array<string>();
    console.log(files);

    for (const file of files) {
      file.text().then(() => {
        let reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const document: string | ArrayBuffer | null = reader.result;
          if (typeof document === 'string') {
            parsedFiles.push(document);
            setImages([...parsedFiles]);
          }
        };
      });
    }
  }

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div
      style={{
        width: '100%',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div>
        <input
          ref={uploadFile}
          style={{ display: 'none' }}
          type="file"
          onChange={handleFile}
          multiple
        />

        {images !== undefined && images.length > 1 ? (
          images.map((image) => {
            return (
              <div
                style={{
                  backgroundColor: 'red',
                  height: '100px',
                  width: '155px',
                }}
              >
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={`data:image/jpeg;base64,${image}`}
                  alt=""
                />
              </div>
            );
          })
        ) : (
          <>{'Array de elementos de imagem vazio'}</>
        )}
        <div>
          <Button onClick={openFileExplorer} variant="outlined">
            Abrir explorer
          </Button>
        </div>
      </div>
    </div>
  );
}
