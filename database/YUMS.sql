USE [master]
GO
/****** Object:  Database [YUMS]    Script Date: 14/7/2022 07:51:47 PM ******/
CREATE DATABASE [YUMS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'YUMS', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLSERVER\MSSQL\DATA\YUMS.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'YUMS_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLSERVER\MSSQL\DATA\YUMS_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [YUMS] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [YUMS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [YUMS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [YUMS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [YUMS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [YUMS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [YUMS] SET ARITHABORT OFF 
GO
ALTER DATABASE [YUMS] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [YUMS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [YUMS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [YUMS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [YUMS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [YUMS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [YUMS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [YUMS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [YUMS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [YUMS] SET  DISABLE_BROKER 
GO
ALTER DATABASE [YUMS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [YUMS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [YUMS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [YUMS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [YUMS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [YUMS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [YUMS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [YUMS] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [YUMS] SET  MULTI_USER 
GO
ALTER DATABASE [YUMS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [YUMS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [YUMS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [YUMS] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [YUMS] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [YUMS] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [YUMS] SET QUERY_STORE = OFF
GO
USE [YUMS]
GO
/****** Object:  Table [dbo].[activity]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[activity](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[school_year] [nvarchar](12) NOT NULL,
	[begin_at] [datetimeoffset](7) NOT NULL,
	[end_at] [datetimeoffset](7) NOT NULL,
	[place] [nvarchar](255) NOT NULL,
	[organization_unit] [nvarchar](255) NOT NULL,
	[participant_quantity] [int] NOT NULL,
	[point] [int] NOT NULL,
	[begin_registration_at] [datetimeoffset](7) NULL,
	[end_registration_at] [datetimeoffset](7) NULL,
	[content] [nvarchar](max) NOT NULL,
	[cover_url] [nvarchar](max) NOT NULL,
	[created_by] [int] NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__activity__3213E83F31A769EF] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[activity_class]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[activity_class](
	[id] [nvarchar](255) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[course_id] [nchar](2) NOT NULL,
	[faculty_id] [nchar](3) NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [UQ__activity__72E12F1BDA8CC82B] UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[course]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course](
	[id] [nchar](2) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__course__3213E83F2F58CF1E] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__course__72E12F1B6550BEBC] UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[faculty]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[faculty](
	[id] [nchar](3) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[address] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[phone] [nvarchar](11) NULL,
	[university_union_id] [int] NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__faculty__3213E83F765C8D8A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__faculty__72E12F1B23954AAF] UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[function]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[function](
	[id] [nvarchar](10) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[controller_name] [nvarchar](255) NOT NULL,
	[group_function_id] [nvarchar](10) NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__function__3213E83F3AEBAA32] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[group_function]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[group_function](
	[id] [nvarchar](10) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__group_fu__3213E83F6A66BC99] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__group_fu__72E12F1B98CF75C4] UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[lecture]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lecture](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[phone] [nvarchar](255) NOT NULL,
	[faculty_id] [nchar](3) NOT NULL,
	[is_faculty_secretary] [bit] NULL,
	[email] [nvarchar](255) NULL,
	[user_id] [int] NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__lecture__3213E83FBBD32E26] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__lecture__72E12F1B41D1C81B] UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[news]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[news](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[cover_url] [nvarchar](max) NOT NULL,
	[content] [nvarchar](max) NOT NULL,
	[university_union_id] [int] NOT NULL,
	[category] [int] NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[permission]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[permission](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[role_id] [int] NOT NULL,
	[function_id] [nvarchar](10) NOT NULL,
	[is_access] [bit] NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__permissi__3213E83F87178A7B] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[register_join]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[register_join](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[student_id] [nvarchar](9) NULL,
	[activity_id] [int] NULL,
	[registered_at] [datetimeoffset](7) NULL,
	[attended_at] [datetimeoffset](7) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [register_join_activity_id_student_id_unique] UNIQUE NONCLUSTERED 
(
	[student_id] ASC,
	[activity_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_of_user]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role_of_user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[role_id] [int] NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [role_of_user_user_id_role_id_unique] UNIQUE NONCLUSTERED 
(
	[user_id] ASC,
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[student]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[student](
	[id] [nvarchar](9) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[gender] [bit] NULL,
	[birthday] [date] NULL,
	[email] [nvarchar](256) NULL,
	[phone] [nvarchar](10) NULL,
	[activity_class_id] [nvarchar](255) NOT NULL,
	[is_union_member] [bit] NULL,
	[is_class_secretary] [bit] NOT NULL,
	[user_id] [int] NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__student__3213E83F4D418F12] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[submit_union_fee]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[submit_union_fee](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[student_id] [nvarchar](9) NOT NULL,
	[union_fee_id] [int] NOT NULL,
	[submitted] [bit] NOT NULL,
	[submitted_at] [datetimeoffset](7) NULL,
	[class_confirmed] [datetimeoffset](7) NULL,
	[faculty_confirmed] [datetimeoffset](7) NULL,
	[school_confirmed] [datetimeoffset](7) NULL,
	[confirmed_by] [int] NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__submit_u__3213E83F61653708] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [submit_union_fee_union_fee_id_student_id_unique] UNIQUE NONCLUSTERED 
(
	[student_id] ASC,
	[union_fee_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[union_fee]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[union_fee](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[school_year] [nvarchar](12) NOT NULL,
	[amount_of_money] [int] NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
 CONSTRAINT [PK__union_fe__3213E83F9EE128C7] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[union_textbook]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[union_textbook](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[submitted] [bit] NOT NULL,
	[submitted_at] [date] NULL,
	[class_confirmed] [datetimeoffset](7) NULL,
	[school_confirmed] [datetimeoffset](7) NULL,
	[student_id] [nvarchar](9) NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
	[join_union_at] [date] NULL,
	[confirmed_by] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[university_union]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[university_union](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 14/7/2022 07:51:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[username] [nvarchar](255) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[is_active] [bit] NOT NULL,
	[created_at] [datetimeoffset](7) NOT NULL,
	[updated_at] [datetimeoffset](7) NOT NULL,
	[deleted_at] [datetimeoffset](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[student] ADD  CONSTRAINT [DF_student_is_class_secretary]  DEFAULT ((0)) FOR [is_class_secretary]
GO
ALTER TABLE [dbo].[activity_class]  WITH CHECK ADD  CONSTRAINT [FK__activity___cours__5535A963] FOREIGN KEY([course_id])
REFERENCES [dbo].[course] ([id])
GO
ALTER TABLE [dbo].[activity_class] CHECK CONSTRAINT [FK__activity___cours__5535A963]
GO
ALTER TABLE [dbo].[activity_class]  WITH CHECK ADD  CONSTRAINT [FK__activity___facul__5629CD9C] FOREIGN KEY([faculty_id])
REFERENCES [dbo].[faculty] ([id])
GO
ALTER TABLE [dbo].[activity_class] CHECK CONSTRAINT [FK__activity___facul__5629CD9C]
GO
ALTER TABLE [dbo].[faculty]  WITH CHECK ADD  CONSTRAINT [FK__faculty__univers__4C0144E4] FOREIGN KEY([university_union_id])
REFERENCES [dbo].[university_union] ([id])
GO
ALTER TABLE [dbo].[faculty] CHECK CONSTRAINT [FK__faculty__univers__4C0144E4]
GO
ALTER TABLE [dbo].[function]  WITH CHECK ADD  CONSTRAINT [FK__function__group___6EC0713C] FOREIGN KEY([group_function_id])
REFERENCES [dbo].[group_function] ([id])
GO
ALTER TABLE [dbo].[function] CHECK CONSTRAINT [FK__function__group___6EC0713C]
GO
ALTER TABLE [dbo].[lecture]  WITH CHECK ADD  CONSTRAINT [FK__lecture__faculty__4D94879B] FOREIGN KEY([faculty_id])
REFERENCES [dbo].[faculty] ([id])
GO
ALTER TABLE [dbo].[lecture] CHECK CONSTRAINT [FK__lecture__faculty__4D94879B]
GO
ALTER TABLE [dbo].[lecture]  WITH CHECK ADD  CONSTRAINT [FK__lecture__user_id__4E88ABD4] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[lecture] CHECK CONSTRAINT [FK__lecture__user_id__4E88ABD4]
GO
ALTER TABLE [dbo].[news]  WITH CHECK ADD FOREIGN KEY([university_union_id])
REFERENCES [dbo].[university_union] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[permission]  WITH CHECK ADD  CONSTRAINT [FK__permissio__funct__72910220] FOREIGN KEY([function_id])
REFERENCES [dbo].[function] ([id])
GO
ALTER TABLE [dbo].[permission] CHECK CONSTRAINT [FK__permissio__funct__72910220]
GO
ALTER TABLE [dbo].[permission]  WITH CHECK ADD  CONSTRAINT [FK__permissio__role___719CDDE7] FOREIGN KEY([role_id])
REFERENCES [dbo].[role] ([id])
GO
ALTER TABLE [dbo].[permission] CHECK CONSTRAINT [FK__permissio__role___719CDDE7]
GO
ALTER TABLE [dbo].[register_join]  WITH CHECK ADD  CONSTRAINT [FK__register___activ__22FF2F51] FOREIGN KEY([activity_id])
REFERENCES [dbo].[activity] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[register_join] CHECK CONSTRAINT [FK__register___activ__22FF2F51]
GO
ALTER TABLE [dbo].[register_join]  WITH CHECK ADD  CONSTRAINT [FK__register___stude__220B0B18] FOREIGN KEY([student_id])
REFERENCES [dbo].[student] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[register_join] CHECK CONSTRAINT [FK__register___stude__220B0B18]
GO
ALTER TABLE [dbo].[role_of_user]  WITH CHECK ADD FOREIGN KEY([role_id])
REFERENCES [dbo].[role] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[role_of_user]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[student]  WITH CHECK ADD  CONSTRAINT [FK__student__user_id__3E1D39E1] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[student] CHECK CONSTRAINT [FK__student__user_id__3E1D39E1]
GO
ALTER TABLE [dbo].[submit_union_fee]  WITH CHECK ADD  CONSTRAINT [FK__submit_un__stude__6ABAD62E] FOREIGN KEY([student_id])
REFERENCES [dbo].[student] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[submit_union_fee] CHECK CONSTRAINT [FK__submit_un__stude__6ABAD62E]
GO
ALTER TABLE [dbo].[submit_union_fee]  WITH CHECK ADD  CONSTRAINT [FK__submit_un__union__6BAEFA67] FOREIGN KEY([union_fee_id])
REFERENCES [dbo].[union_fee] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[submit_union_fee] CHECK CONSTRAINT [FK__submit_un__union__6BAEFA67]
GO
ALTER TABLE [dbo].[union_textbook]  WITH CHECK ADD  CONSTRAINT [FK__union_tex__stude__22CA2527] FOREIGN KEY([student_id])
REFERENCES [dbo].[student] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[union_textbook] CHECK CONSTRAINT [FK__union_tex__stude__22CA2527]
GO
USE [master]
GO
ALTER DATABASE [YUMS] SET  READ_WRITE 
GO
