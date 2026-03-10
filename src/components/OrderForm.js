import React from "react";
import { createOrder } from "../api/orderService";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Grid,
  Alert,
} from "@mui/material";
import { Skeleton } from "@mui/lab";
import { useFormik } from "formik";
import * as Yup from "yup";

const OrderForm = () => {
  const formik = useFormik({
    initialValues: {
      customerName: "",
      items: "",
      total: "",
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Customer Name is required"),
      items: Yup.string().required("Items are required"),
      total: Yup.number()
        .required("Total is required")
        .positive("Total must be a positive number"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      setSubmitting(true);
      setStatus(null);
      try {
        const response = await createOrder(values);
        setStatus({ success: true, message: "Order submitted successfully!", orderId: response.order?.orderId });
        resetForm();
      } catch (error) {
        setStatus({ success: false, message: error.message });
      }
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Place an Order
        </Typography>
        {!formik.isSubmitting && (
          <form style={{ minWidth: "60%" }} onSubmit={formik.handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Customer Name"
                fullWidth
                variant="outlined"
                name="customerName"
                value={formik.values.customerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                helperText={formik.touched.customerName && formik.errors.customerName}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Items (comma separated)"
                fullWidth
                variant="outlined"
                name="items"
                value={formik.values.items}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.items && Boolean(formik.errors.items)}
                helperText={formik.touched.items && formik.errors.items}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Total ($)"
                fullWidth
                variant="outlined"
                name="total"
                type="number"
                inputProps={{ min: 0, step: "0.01" }}
                value={formik.values.total}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.total && Boolean(formik.errors.total)}
                helperText={formik.touched.total && formik.errors.total}
              />
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                    startIcon={formik.isSubmitting && <CircularProgress size={20} />}
                  >
                    {formik.isSubmitting ? "Submitting..." : "Submit Order"}
                  </Button>
                </Grid>
                {formik.dirty && (
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => formik.resetForm()}
                      disabled={formik.isSubmitting}
                    >
                      Reset
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          </form>
        )}
        {formik.isSubmitting && (
          <Box sx={{ mt: 3 }}>
            <Skeleton variant="rectangular" height={118} />
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        )}
        {formik.status && (
          <Box sx={{ mt: 3 }}>
            <Alert severity={formik.status.success ? "success" : "error"}>
              {formik.status.message}
              {formik.status.orderId && (
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Order ID: <strong>{formik.status.orderId}</strong>
                </Typography>
              )}
            </Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default OrderForm;
