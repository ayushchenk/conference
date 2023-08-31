import { UploadFile } from "@mui/icons-material";
import { FormControl, Box, FormHelperText, IconButton, Button } from "@mui/material";
import { FormikProps } from "formik";
import { ChangeEvent, useRef } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { DocxPreviewLink } from "./DocxPreviewLink";

export type UploadFileControlProps<T> = {
  formik: FormikProps<T>,
  field: keyof T,
  label: string,
  mimeType?: string
}

export const UploadFileControl = <T,>({ formik, field, label, mimeType }: UploadFileControlProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const file = formik.values[field] as File;

  return (
    <FormControl fullWidth error={formik.touched[field] && Boolean(formik.errors[field])}>
      <Box sx={{ display: "flex", mt: 2 }}>
        {formik.values[field] &&
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DocxPreviewLink file={file}>{file.name}</DocxPreviewLink>
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
            accept={mimeType ?? "*"}
            type="file"
            hidden
            onClick={() => inputRef.current!.value = ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                formik.setFieldValue(field.toString(), event.target.files[0]);
              }
            }}
          />
        </Button>
      </Box>
      {formik.touched[field] && formik.errors[field] && <FormHelperText>{formik.errors[field]?.toString()}</FormHelperText>}
    </FormControl>
  );
}