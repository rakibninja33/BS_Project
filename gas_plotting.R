# Load the necessary library if not already loaded
library(ggplot2)
library(readxl)
library(scales)
data <- read_excel("D:/Docs/DSM/BS/8th Semester/415 DSMHP/Project/GEE Export/Table Data/Statistical Data_all_gases.xlsx", 
                   sheet = "SO2")
head(data)


# Convert 'Year' and 'Month' to a Date object
data$Date <- as.Date(paste(data$Year, data$Month, "01", sep = "-"), format = "%Y-%m-%d")

# Create a line plot with connecting lines between max and min points
# Use geom_ribbon for the shaded area
m <-  ggplot(data, aes(x = Date, y = Mean)) +
  geom_ribbon(aes(ymin = Min, ymax = Max), fill = "skyblue", alpha = 0.1) +
  geom_line(color = 'black', linewidth = 2) +
  labs(title = expression("Tropospheric SO"[2] *" Vertical Column Density Over Time") ,
       x = "",
       y = expression("Density (mol/m"^2* ")")   ) +
  theme_minimal() + 
  theme(plot.title = element_text(hjust = .5, size = 20),
        axis.text.x = element_text(angle = 0, hjust = 1)
  )

m
z <- m + scale_y_continuous(limits = c(-0.00001,.0004), breaks =  scales::breaks_width(.0001), labels = number_format(accuracy = .0001))
z
z + scale_x_date(
  labels = scales::date_format("%Y"),
  breaks = seq(as.Date("2019-1-01"), as.Date("2024-01-01"), by = "1 year")
)

