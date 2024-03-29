import { UploadFile } from "@mui/icons-material";
import { FormControl, Box, FormHelperText, IconButton, Button } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { DocxPreviewLink } from "./DocxPreviewLink";
import { UploadFileControlProps } from "./UploadFileControl";

export const UploadFilesControl = <T,>({ formik, field, label, mimeType }: UploadFileControlProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FormControl fullWidth error={formik.touched[field] && Boolean(formik.errors[field])}>
      <Box sx={{ display: "flex", mt: 2 }}>
        {formik.values[field] &&
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              {(formik.values[field] as File[]).map((file, index) => (
                <DocxPreviewLink file={file} key={index}>{file.name}</DocxPreviewLink>
              ))}
            </Box>
            <IconButton onClick={() => { formik.setFieldValue(field.toString(), undefined) }}>
              <ClearIcon />
            </IconButton>
          </Box>
        }
        <Button fullWidth variant="outlined" component="label" startIcon={<UploadFile />}>
          {label}
          <input
            ref={inputRef}
            id={field.toString()}
            name={field.toString()}
            multiple
            type="file"
            accept={mimeType}
            hidden
            onClick={() => inputRef.current!.value = ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                formik.setFieldValue(field.toString(), Array.from(event.target.files));
              }
            }}
          />
        </Button>
      </Box>
      {formik.touched[field] && formik.errors[field] && <FormHelperText>{formik.errors[field]?.toString()}</FormHelperText>}
    </FormControl>
  );
}