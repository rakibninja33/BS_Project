

# Assuming your dataset is named 'your_data'
# Replace 'your_data' with the actual name of your dataset

# Load the necessary libraries if not already loaded
library(ggplot2)
library(dplyr)
library(readxl)

data <- read_excel("D:/Docs/DSM/BS/8th Semester/415 DSMHP/Project/GEE Export/Table Data/Correlation Analysis.xlsx")

# Create a scatter plot
graph = ggplot(data, aes(x = no2, y = tp)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE, color = "black", formula = y ~ x) +
  labs(title = expression("Scatter Plot of NO" [2] * " Vartical Column Density vs Precipitation"),
       x = expression("Density (mol/m"^2 * ")"),
       y = "Precipitation (mm)",
       subtitle = sprintf("Correlation Coefficient: %.5f", cor(data$tp, data$no2))) +
  theme_minimal() +
  theme(plot.title = element_text(hjust = .5, size = 20),
        plot.subtitle = element_text(hjust = 1, size = 12))
graph

# Calculate and print the correlation coefficient
correlation_coefficient <- cor(data$tp, data$no2)
cat("Correlation Coefficient:", correlation_coefficient, "\n")

# Fit a linear model to calculate R^2
linear_model <- lm(no2 ~ tp, data = data)
r_squared <- summary(linear_model)$r.squared
cat("R^2 Value:", r_squared, "\n")

ggsave("D:/Docs/DSM/BS/8th Semester/415 DSMHP/Project/GEE Export/Table Data/plot.jpeg", plot = m, width = 992, height = 447, units = 'px')







