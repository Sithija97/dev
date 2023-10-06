import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { BoxContainer } from "../components";
import { useAppDispatch } from "../store/store";
import { createComplaints } from "../store/complaints/complaintsSlice";

export const CreateComplaint = () => {
  const dispatch = useAppDispatch();

  const initialState = {
    Title: "",
    Category: 1,
    PoliceStation: 1,
    statusId: 1,
    Complaint: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    const data = {
      title: formData.Title,
      policeStationId: Number(formData.PoliceStation),
      complaint: formData.Complaint,
      category: Number(formData.Category),
      statusId: Number(formData.statusId),
    };
    dispatch(createComplaints(data));
    setFormData(initialState);
  };

  return (
    <BoxContainer>
      <Container>
        <Typography sx={{ mt: 12, mb: 5 }} variant="h5" gutterBottom>
          Add Complaint
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid sx={{ mt: 1 }} container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                id="Title"
                name="Title"
                label="Title"
                fullWidth
                value={formData.Title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  label="Category"
                  name="Category"
                  value={formData.Category}
                  onChange={handleInputChange}
                >
                  <MenuItem value={1}>Category 1</MenuItem>
                  <MenuItem value={2}>Category 2</MenuItem>
                  <MenuItem value={3}>Category 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Police Station
                </InputLabel>
                <Select
                  label="Police Station"
                  name="PoliceStation"
                  value={formData.PoliceStation}
                  onChange={handleInputChange}
                >
                  <MenuItem value={1}>Maharagama</MenuItem>
                  <MenuItem value={2}>Borella</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  label="Status"
                  name="statusId"
                  value={formData.statusId}
                  onChange={handleInputChange}
                >
                  <MenuItem value={1}>Pending</MenuItem>
                  <MenuItem value={2}>Inprogress</MenuItem>
                  <MenuItem value={3}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid sx={{ mt: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="Complaint"
                name="Complaint"
                label="Complaint"
                multiline
                rows={12}
                fullWidth
                value={formData.Complaint}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Button sx={{ mt: 3, mb: 2 }} variant="contained" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </BoxContainer>
  );
};