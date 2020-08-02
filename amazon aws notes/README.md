# amazon aws notes

|||aws config
|||~/.aws/config

```bash
[default]
output = json
region = eu-west-1
aws_proxy_host="[AWS-PROXY-HOST]"
aws_access_key_id=[AWS-ACCESS-KEY]
aws_secret_access_key=[AWS-SECRET-ACCESS-KEY]


[profile adminuser]
output = json
region = eu-west-1
aws_proxy_host="[AWS-PROXY-HOST]"
aws_access_key_id=[AWS-ACCESS-KEY]
aws_secret_access_key=[AWS-SECRET-ACCESS-KEY]
```

---

|||aws cloudformation templates

<https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html>

<https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/working-with-templates-cfn-designer-overview.html>

<https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/sample-templates-services-eu-west-2.html>

<https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/sample-templates-appframeworks-eu-west-2.html>

<https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-sample-templates.html>

---

|||aws natgateway
|||aws nat
|||aws cloudformation natgateway
|||aws cloudformation nat

<https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-natgateway.html>

```json
"NAT" : {
  "DependsOn" : "VPCGatewayAttach",
  "Type" : "AWS::EC2::NatGateway",
  "Properties" : {
    "AllocationId" : { "Fn::GetAtt" : ["EIP", "AllocationId"]},
    "SubnetId" : { "Ref" : "Subnet"}
  }
},
"EIP" : {
  "Type" : "AWS::EC2::EIP",
  "Properties" : {
    "Domain" : "vpc"
  }
},
"Route" : {
  "Type" : "AWS::EC2::Route",
  "Properties" : {
    "RouteTableId" : { "Ref" : "RouteTable" },
    "DestinationCidrBlock" : "0.0.0.0/0",
    "NatGatewayId" : { "Ref" : "NAT" }
  }
}
```

---

|||aws cloudformation example beanstalk

<https://github.com/cfregly/fluxcapacitor/blob/master/cloudformation/Sample-Elastic-Beanstalk-in-VPC.template>

```json
{
  "AWSTemplateFormatVersion" : "2010-09-09",

  "Description" : "AWS CloudFormation Sample Template Elastic-Beanstalk-in-vpc.template: Sample template showing how to create an Elastic Beanstalk environment in a VPC. The stack contains 2 subnets: the first subnet is public and contains the load balancer, a NAT device for internet access from the private subnet and a bastion host to allow SSH access to the Elastic Beanstalk hosts. The second subnet is private and contains the Elastic Beanstalk instances. You will be billed for the AWS resources used if you create a stack from this template.",

  "Parameters" : {

    "BastionKeyName" : {
      "Description" : "Name of an existing EC2 KeyPair to enable SSH access to the bastion host",
      "Type" : "String",
      "MinLength": "1",
      "MaxLength": "64",
      "AllowedPattern" : "[-_ a-zA-Z0-9]*",
      "ConstraintDescription" : "can contain only alphanumeric characters, spaces, dashes and underscores."
    },

    "InstanceKeyName" : {
      "Description" : "Name of an existing EC2 KeyPair to enable SSH access to the Elastic Beanstalk hosts",
      "Type" : "String",
      "MinLength": "1",
      "MaxLength": "64",
      "AllowedPattern" : "[-_ a-zA-Z0-9]*",
      "ConstraintDescription" : "can contain only alphanumeric characters, spaces, dashes and underscores."
    },

    "SSHFrom" : {
      "Description" : "Lockdown SSH access to the bastion host (default can be accessed from anywhere)",
      "Type" : "String",
      "MinLength": "9",
      "MaxLength": "18",
      "Default" : "0.0.0.0/0",
      "AllowedPattern" : "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})",
      "ConstraintDescription" : "must be a valid CIDR range of the form x.x.x.x/x."
    },

    "BastionInstanceType" : {
      "Description" : "Bastion Host EC2 instance type",
      "Type" : "String",
      "Default" : "m1.small",
      "AllowedValues" : [ "t1.micro","m1.small","m1.medium","m1.large","m1.xlarge","m2.xlarge","m2.2xlarge","m2.4xlarge","c1.medium","c1.xlarge","cc1.4xlarge","cc2.8xlarge","cg1.4xlarge"],
      "ConstraintDescription" : "must be a valid EC2 instance type."
    },

    "NATInstanceType" : {
      "Description" : "NAT Device EC2 instance type",
      "Type" : "String",
      "Default" : "m1.small",
      "AllowedValues" : [ "t1.micro","m1.small","m1.medium","m1.large","m1.xlarge","m2.xlarge","m2.2xlarge","m2.4xlarge","c1.medium","c1.xlarge","cc1.4xlarge","cc2.8xlarge","cg1.4xlarge"],
      "ConstraintDescription" : "must be a valid EC2 instance type."
    }
  },

  "Mappings" : {
    "AWSNATAMI" : {
      "us-east-1"      : { "AMI" : "ami-c6699baf" },
      "us-west-2"      : { "AMI" : "ami-52ff7262" },
      "us-west-1"      : { "AMI" : "ami-3bcc9e7e" },
      "eu-west-1"      : { "AMI" : "ami-0b5b6c7f" },
      "ap-southeast-1" : { "AMI" : "ami-02eb9350" },
      "ap-northeast-1" : { "AMI" : "ami-14d86d15" },
      "sa-east-1"      : { "AMI" : "ami-0439e619" }
    },

    "AWSInstanceType2Arch" : {
      "t1.micro"    : { "Arch" : "64" },
      "m1.small"    : { "Arch" : "64" },
      "m1.medium"   : { "Arch" : "64" },
      "m1.large"    : { "Arch" : "64" },
      "m1.xlarge"   : { "Arch" : "64" },
      "m2.xlarge"   : { "Arch" : "64" },
      "m2.2xlarge"  : { "Arch" : "64" },
      "m2.4xlarge"  : { "Arch" : "64" },
      "c1.medium"   : { "Arch" : "64" },
      "c1.xlarge"   : { "Arch" : "64" },
      "cc1.4xlarge" : { "Arch" : "64Cluster" },
      "cc2.8xlarge" : { "Arch" : "64Cluster" },
      "cg1.4xlarge" : { "Arch" : "64GPU" }
    },

    "AWSRegionArch2AMI" : {
      "us-east-1"      : { "32" : "ami-a0cd60c9", "64" : "ami-aecd60c7", "64Cluster" : "ami-a8cd60c1",      "64GPU" : "ami-eccf6285" },
      "us-west-2"      : { "32" : "ami-46da5576", "64" : "ami-48da5578", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" },
      "us-west-1"      : { "32" : "ami-7d4c6938", "64" : "ami-734c6936", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" },
      "eu-west-1"      : { "32" : "ami-61555115", "64" : "ami-6d555119", "64Cluster" : "ami-67555113",      "64GPU" : "NOT_YET_SUPPORTED" },
      "ap-southeast-1" : { "32" : "ami-220b4a70", "64" : "ami-3c0b4a6e", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" },
      "ap-northeast-1" : { "32" : "ami-2a19aa2b", "64" : "ami-2819aa29", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" },
      "sa-east-1"      : { "32" : "ami-f836e8e5", "64" : "ami-fe36e8e3", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" }
    },

    "SubnetConfig" : {
      "VPC"     : { "CIDR" : "10.0.0.0/16" },
      "Public"  : { "CIDR" : "10.0.0.0/24" },
      "Private" : { "CIDR" : "10.0.1.0/24" }
    }
  },

  "Resources" : {

    "VPC" : {
      "Type" : "AWS::EC2::VPC",
      "Properties" : {
        "CidrBlock" : { "Fn::FindInMap" : [ "SubnetConfig", "VPC", "CIDR" ]},
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackName" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "PublicSubnet" : {
      "DependsOn" : ["VPC"],
      "Type" : "AWS::EC2::Subnet",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "CidrBlock" : { "Fn::FindInMap" : [ "SubnetConfig", "Public", "CIDR" ]},
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackName" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "InternetGateway" : {
      "Type" : "AWS::EC2::InternetGateway",
      "Properties" : {
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackName" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "GatewayToInternet" : {
       "DependsOn" : ["VPC", "InternetGateway"],
       "Type" : "AWS::EC2::VPCGatewayAttachment",
       "Properties" : {
         "VpcId" : { "Ref" : "VPC" },
         "InternetGatewayId" : { "Ref" : "InternetGateway" }
       }
    },

    "PublicRouteTable" : {
      "DependsOn" : ["VPC"],
      "Type" : "AWS::EC2::RouteTable",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackName" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "PublicRoute" : {
      "DependsOn" : ["PublicRouteTable", "InternetGateway"],
      "Type" : "AWS::EC2::Route",
      "Properties" : {
        "RouteTableId" : { "Ref" : "PublicRouteTable" },
        "DestinationCidrBlock" : "0.0.0.0/0",
        "GatewayId" : { "Ref" : "InternetGateway" }
      }
    },

    "PublicSubnetRouteTableAssociation" : {
      "DependsOn" : ["PublicSubnet", "PublicRouteTable"],
      "Type" : "AWS::EC2::SubnetRouteTableAssociation",
      "Properties" : {
        "SubnetId" : { "Ref" : "PublicSubnet" },
        "RouteTableId" : { "Ref" : "PublicRouteTable" }
      }
    },

    "PublicNetworkAcl" : {
      "DependsOn" : ["VPC"],
      "Type" : "AWS::EC2::NetworkAcl",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackName" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "InboundHTTPPublicNetworkAclEntry" : {
      "DependsOn" : ["PublicNetworkAcl"],
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "100",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "80", "To" : "80" }
      }
    },

    "InboundHTTPSPublicNetworkAclEntry" : {
      "DependsOn" : ["PublicNetworkAcl"],
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "101",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "443", "To" : "443" }
      }
    },

    "InboundSSHPublicNetworkAclEntry" : {
      "DependsOn" : ["PublicNetworkAcl"],
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "102",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : { "Ref" : "SSHFrom" },
        "PortRange" : { "From" : "22", "To" : "22" }
      }
    },

    "InboundEmphemeralPublicNetworkAclEntry" : {
      "DependsOn" : ["PublicNetworkAcl"],
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "103",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "1024", "To" : "65535" }
      }
    },

    "OutboundPublicNetworkAclEntry" : {
      "DependsOn" : ["PublicNetworkAcl"],
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "100",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "true",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "0", "To" : "65535" }
      }
    },

    "PublicSubnetNetworkAclAssociation" : {
      "DependsOn" : ["PublicSubnet", "PublicNetworkAcl"],
      "Type" : "AWS::EC2::SubnetNetworkAclAssociation",
      "Properties" : {
        "SubnetId" : { "Ref" : "PublicSubnet" },
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" }
      }
    },

    "PrivateSubnet" : {
      "DependsOn" : ["VPC"],
      "Type" : "AWS::EC2::Subnet",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "CidrBlock" : { "Fn::FindInMap" : [ "SubnetConfig", "Private", "CIDR" ]},
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackName" } },
          { "Key" : "Network", "Value" : "Private" }
        ]
      }
    },

    "PrivateRouteTable" : {
      "DependsOn" : ["VPC"],
      "Type" : "AWS::EC2::RouteTable",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackName" } },
          { "Key" : "Network", "Value" : "Private" }
        ]
      }
    },

    "PrivateSubnetRouteTableAssociation" : {
      "DependsOn" : ["PrivateSubnet", "PrivateRouteTable"],
      "Type" : "AWS::EC2::SubnetRouteTableAssociation",
      "Properties" : {
        "SubnetId" : { "Ref" : "PrivateSubnet" },
        "RouteTableId" : { "Ref" : "PrivateRouteTable" }
      }
    },

    "PrivateRoute" : {
      "DependsOn" : ["PrivateRouteTable", "NATDevice"],
      "Type" : "AWS::EC2::Route",
      "Properties" : {
        "RouteTableId" : { "Ref" : "PrivateRouteTable" },
        "DestinationCidrBlock" : "0.0.0.0/0",
        "InstanceId" : { "Ref" : "NATDevice" }
      }
    },

    "PrivateNetworkAcl" : {
      "DependsOn" : ["VPC"],
      "Type" : "AWS::EC2::NetworkAcl",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackName" } },
          { "Key" : "Network", "Value" : "Private" }
        ]
      }
    },

    "InboundPrivateNetworkAclEntry" : {
      "DependsOn" : ["PrivateNetworkAcl"],
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PrivateNetworkAcl" },
        "RuleNumber" : "100",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "0", "To" : "65535" }
      }
    },

    "OutBoundPrivateNetworkAclEntry" : {
      "DependsOn" : ["PrivateNetworkAcl"],
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PrivateNetworkAcl" },
        "RuleNumber" : "100",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "true",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "0", "To" : "65535" }
      }
    },

    "PrivateSubnetNetworkAclAssociation" : {
      "DependsOn" : ["PrivateSubnet", "PrivateNetworkAcl"],
      "Type" : "AWS::EC2::SubnetNetworkAclAssociation",
      "Properties" : {
        "SubnetId" : { "Ref" : "PrivateSubnet" },
        "NetworkAclId" : { "Ref" : "PrivateNetworkAcl" }
      }
    },

    "NATIPAddress" : {
      "DependsOn" : ["NATDevice"],
      "Type" : "AWS::EC2::EIP",
      "Properties" : {
        "Domain" : "vpc",
        "InstanceId" : { "Ref" : "NATDevice" }
      }
    },

    "NATDevice" : {
      "DependsOn" : ["PublicSubnet", "NATSecurityGroup"],
      "Type" : "AWS::EC2::Instance",
      "Properties" : {
        "InstanceType" : { "Ref" : "NATInstanceType" },
        "SubnetId" : { "Ref" : "PublicSubnet" },
        "SourceDestCheck" : "false",
        "ImageId" : { "Fn::FindInMap" : [ "AWSNATAMI", { "Ref" : "AWS::Region" }, "AMI" ]},
        "SecurityGroupIds" : [{ "Ref" : "NATSecurityGroup" }]
      }
    },

    "NATSecurityGroup" : {
      "DependsOn" : ["BeanstalkSecurityGroup"],
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Enable internal access to the NAT device",
        "VpcId" : { "Ref" : "VPC" },
        "SecurityGroupIngress" : [
           { "IpProtocol" : "tcp", "FromPort" : "80",  "ToPort" : "80",  "SourceSecurityGroupId" : { "Ref" : "BeanstalkSecurityGroup" }} ,
           { "IpProtocol" : "tcp", "FromPort" : "443", "ToPort" : "443", "SourceSecurityGroupId" : { "Ref" : "BeanstalkSecurityGroup" } } ],
        "SecurityGroupEgress" : [
           { "IpProtocol" : "tcp", "FromPort" : "80",  "ToPort" : "80",  "CidrIp" : "0.0.0.0/0" } ,
           { "IpProtocol" : "tcp", "FromPort" : "443", "ToPort" : "443", "CidrIp" : "0.0.0.0/0" } ]
      }
    },

    "BastionIPAddress" : {
      "Type" : "AWS::EC2::EIP",
      "Properties" : {
        "Domain" : "vpc",
        "InstanceId" : { "Ref" : "BastionHost" }
      }
    },

    "BastionHost" : {
      "DependsOn" : ["PublicSubnet", "BastionSecurityGroup"],
      "Type" : "AWS::EC2::Instance",
      "Properties" : {
        "InstanceType" : { "Ref" : "BastionInstanceType" },
        "KeyName"  : { "Ref" : "BastionKeyName" },
        "SubnetId" : { "Ref" : "PublicSubnet" },
        "ImageId"  : { "Fn::FindInMap" : [ "AWSRegionArch2AMI", { "Ref" : "AWS::Region" }, { "Fn::FindInMap" : [ "AWSInstanceType2Arch", { "Ref" : "BastionInstanceType" }, "Arch" ] } ] },
        "SecurityGroupIds" : [{ "Ref" : "BastionSecurityGroup" }]
      }
    },

    "BastionSecurityGroup" : {
      "DependsOn" : ["VPC"],
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Enable access to the Bastion host",
        "VpcId" : { "Ref" : "VPC" },
        "SecurityGroupIngress" : [ { "IpProtocol" : "tcp", "FromPort" : "22",  "ToPort" : "22",  "CidrIp" : { "Ref" : "SSHFrom" }} ],
        "SecurityGroupEgress"  : [ { "IpProtocol" : "tcp", "FromPort" : "22",  "ToPort" : "22",  "CidrIp" : { "Fn::FindInMap" : [ "SubnetConfig", "Private", "CIDR" ]}}]
      }
    },

    "BeanstalkSecurityGroup" : {
      "DependsOn" : ["VPC"],
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Allow the Elastic Beanstalk instances to access the NAT device",
        "VpcId" : { "Ref" : "VPC" }
      }
    },

    "SampleApplication" : {
      "Type" : "AWS::ElasticBeanstalk::Application",
      "Properties" : {
        "Description" : "AWS Elastic Beanstalk Python Sample Application",
        "ApplicationVersions" : [{
          "VersionLabel" : "Initial Version",
          "Description" : "Version 1.0",
          "SourceBundle" : {
            "S3Bucket" : { "Fn::Join" : ["-", ["elasticbeanstalk-samples", { "Ref" : "AWS::Region" }]]},
            "S3Key" : "python-sample.zip"
          }
        }]
      }
    },

    "SampleEnvironment" : {
      "DependsOn" : ["SampleApplication", "BastionSecurityGroup", "BeanstalkSecurityGroup", "VPC", "PrivateSubnet", "PublicSubnet"],
      "Type" : "AWS::ElasticBeanstalk::Environment",
      "Properties" : {
        "ApplicationName" : { "Ref" : "SampleApplication" },
         "Description" :  "AWS Elastic Beanstalk Environment running Python Sample Application",
         "SolutionStackName" : "64bit Amazon Linux running Python",
         "OptionSettings" : [
           {"Namespace" : "aws:autoscaling:launchconfiguration", "OptionName" : "SSHSourceRestriction", "Value" : { "Fn::Join" : [ "", ["tcp,22,22,", { "Ref" : "BastionSecurityGroup" }]]}},
           {"Namespace" : "aws:autoscaling:launchconfiguration", "OptionName" : "SecurityGroups", "Value" : { "Ref" : "BeanstalkSecurityGroup" }},
           {"Namespace" : "aws:autoscaling:launchconfiguration", "OptionName" : "EC2KeyName", "Value" : { "Ref" : "InstanceKeyName" }},
           {"Namespace" : "aws:ec2:vpc", "OptionName" : "VPCId", "Value" : { "Ref" : "VPC" }},
           {"Namespace" : "aws:ec2:vpc", "OptionName" : "Subnets", "Value" : { "Ref" : "PrivateSubnet" }},
           {"Namespace" : "aws:ec2:vpc", "OptionName" : "ELBSubnets", "Value" : { "Ref" : "PublicSubnet" }}],
         "VersionLabel" : "Initial Version"
      }
    }
  },

  "Outputs" : {

    "Bastion" : {
      "Description" : "IP Address of the Bastion host",
      "Value" :  { "Ref" : "BastionIPAddress" }
    },
    "URL" : {
      "Description" : "The URL of the Elastic Beanstalk environment",
      "Value" :  { "Fn::Join" : [ "", [ "http://", { "Fn::GetAtt" : ["SampleEnvironment", "EndpointURL"] }]]}
    }
  }
}
```

---

|||aws cloudformation example

<https://github.com/satterly/AWSCloudFormation-samples/blob/master/multi-tier-web-app-in-vpc.template>

```json
{
  "AWSTemplateFormatVersion" : "2010-09-09",

  "Description" : "AWS CloudFormation Sample Template multi-tier-web-app-in-vpc.template: Sample template showing how to create a multi-tier web application in a VPC with multiple subnets. The first subnet is public and contains and internet facing load balancer, a NAT device for internet access from the private subnet and a bastion host to allow SSH access to the hosts in the private subnet. The second subnet is private and contains a Frontend fleet of EC2 instances, an internal load balancer and a Backend fleet of EC2 instances. **WARNING** This template creates Elastic Load Balancers and Amazon EC2 instances. You will be billed for the AWS resources used if you create a stack from this template.",

  "Parameters" : {

    "KeyName" : {
      "Description" : "Name of an existing EC2 KeyPair to enable SSH access to the instances",
      "Type" : "String",
      "MinLength": "1",
      "MaxLength": "64",
      "AllowedPattern" : "[-_ a-zA-Z0-9]*",
      "ConstraintDescription" : "can contain only alphanumeric characters, spaces, dashes and underscores."
    },

    "SSHLocation" : {
      "Description" : "Lockdown SSH access to the bastion host (default can be accessed from anywhere)",
      "Type" : "String",
      "MinLength": "9",
      "MaxLength": "18",
      "Default" : "0.0.0.0/0",
      "AllowedPattern" : "(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})/(\\d{1,2})",
      "ConstraintDescription" : "must be a valid CIDR range of the form x.x.x.x/x."
    },

    "FrontendInstanceType" : {
      "Description" : "Frontend Server EC2 instance type",
      "Type" : "String",
      "Default" : "m1.small",
      "AllowedValues" : [ "t1.micro","m1.small","m1.medium","m1.large","m1.xlarge","m2.xlarge","m2.2xlarge","m2.4xlarge","m3.xlarge","m3.2xlarge","c1.medium","c1.xlarge","cc1.4xlarge","cc2.8xlarge","cg1.4xlarge"],
      "ConstraintDescription" : "must be a valid EC2 instance type."
    },

    "FrontendSize" : {
      "Description" : "Number of EC2 instances to launch for the Frontend server",
      "Type" : "Number",
      "Default" : "1"
    },

    "BackendInstanceType" : {
      "Description" : "Backend Server EC2 instance type",
      "Type" : "String",
      "Default" : "m1.small",
      "AllowedValues" : [ "t1.micro","m1.small","m1.medium","m1.large","m1.xlarge","m2.xlarge","m2.2xlarge","m2.4xlarge","m3.xlarge","m3.2xlarge","c1.medium","c1.xlarge","cc1.4xlarge","cc2.8xlarge","cg1.4xlarge"],
      "ConstraintDescription" : "must be a valid EC2 instance type."
    },

    "BackendSize" : {
      "Description" : "Number of EC2 instances to launch for the backend server",
      "Type" : "Number",
      "Default" : "1"
    },

    "BastionInstanceType" : {
      "Description" : "Bastion Host EC2 instance type",
      "Type" : "String",
      "Default" : "m1.small",
      "AllowedValues" : [ "t1.micro","m1.small","m1.medium","m1.large","m1.xlarge","m2.xlarge","m2.2xlarge","m2.4xlarge","m3.xlarge","m3.2xlarge","c1.medium","c1.xlarge","cc1.4xlarge","cc2.8xlarge","cg1.4xlarge"],
      "ConstraintDescription" : "must be a valid EC2 instance type."
    },

    "NATInstanceType" : {
      "Description" : "NET Device EC2 instance type",
      "Type" : "String",
      "Default" : "m1.small",
      "AllowedValues" : [ "t1.micro","m1.small","m1.medium","m1.large","m1.xlarge","m2.xlarge","m2.2xlarge","m2.4xlarge","m3.xlarge","m3.2xlarge","c1.medium","c1.xlarge","cc1.4xlarge","cc2.8xlarge","cg1.4xlarge"],
      "ConstraintDescription" : "must be a valid EC2 instance type."
    }
  },

  "Mappings" : {
    "AWSNATAMI" : {
      "us-east-1"      : { "AMI" : "ami-c6699baf" },
      "us-west-2"      : { "AMI" : "ami-52ff7262" },
      "us-west-1"      : { "AMI" : "ami-3bcc9e7e" },
      "eu-west-1"      : { "AMI" : "ami-0b5b6c7f" },
      "ap-southeast-1" : { "AMI" : "ami-02eb9350" },
      "ap-southeast-2" : { "AMI" : "ami-ab990e91" },
      "ap-northeast-1" : { "AMI" : "ami-14d86d15" },
      "sa-east-1"      : { "AMI" : "ami-0439e619" }
    },

    "AWSInstanceType2Arch" : {
      "t1.micro"    : { "Arch" : "64" },
      "m1.small"    : { "Arch" : "64" },
      "m1.medium"   : { "Arch" : "64" },
      "m1.large"    : { "Arch" : "64" },
      "m1.xlarge"   : { "Arch" : "64" },
      "m2.xlarge"   : { "Arch" : "64" },
      "m2.2xlarge"  : { "Arch" : "64" },
      "m2.4xlarge"  : { "Arch" : "64" },
      "m3.xlarge"   : { "Arch" : "64" },
      "m3.2xlarge"  : { "Arch" : "64" },
      "c1.medium"   : { "Arch" : "64" },
      "c1.xlarge"   : { "Arch" : "64" },
      "cc1.4xlarge" : { "Arch" : "64Cluster" },
      "cc2.8xlarge" : { "Arch" : "64Cluster" },
      "cg1.4xlarge" : { "Arch" : "64GPU" }
    },

    "AWSRegionArch2AMI" : {
      "us-east-1"      : { "32" : "ami-a0cd60c9", "64" : "ami-aecd60c7", "64Cluster" : "ami-a8cd60c1",      "64GPU" : "ami-eccf6285" },
      "us-west-2"      : { "32" : "ami-46da5576", "64" : "ami-48da5578", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" },
      "us-west-1"      : { "32" : "ami-7d4c6938", "64" : "ami-734c6936", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" },
      "eu-west-1"      : { "32" : "ami-61555115", "64" : "ami-6d555119", "64Cluster" : "ami-67555113",      "64GPU" : "NOT_YET_SUPPORTED" },
      "ap-southeast-1" : { "32" : "ami-220b4a70", "64" : "ami-3c0b4a6e", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" },
      "ap-southeast-2" : { "32" : "ami-b3990e89", "64" : "ami-bd990e87", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" },
      "ap-northeast-1" : { "32" : "ami-2a19aa2b", "64" : "ami-2819aa29", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" },
      "sa-east-1"      : { "32" : "ami-f836e8e5", "64" : "ami-fe36e8e3", "64Cluster" : "NOT_YET_SUPPORTED", "64GPU" : "NOT_YET_SUPPORTED" }
    },

    "SubnetConfig" : {
      "VPC"     : { "CIDR" : "10.0.0.0/16" },
      "Public"  : { "CIDR" : "10.0.0.0/24" },
      "Private" : { "CIDR" : "10.0.1.0/24" }
    }
  },

  "Resources" : {

    "VPC" : {
      "Type" : "AWS::EC2::VPC",
      "Properties" : {
        "CidrBlock" : { "Fn::FindInMap" : [ "SubnetConfig", "VPC", "CIDR" ]},
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackId" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "PublicSubnet" : {
      "Type" : "AWS::EC2::Subnet",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "CidrBlock" : { "Fn::FindInMap" : [ "SubnetConfig", "Public", "CIDR" ]},
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackId" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "InternetGateway" : {
      "Type" : "AWS::EC2::InternetGateway",
      "Properties" : {
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackId" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "GatewayToInternet" : {
       "Type" : "AWS::EC2::VPCGatewayAttachment",
       "Properties" : {
         "VpcId" : { "Ref" : "VPC" },
         "InternetGatewayId" : { "Ref" : "InternetGateway" }
       }
    },

    "PublicRouteTable" : {
      "Type" : "AWS::EC2::RouteTable",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackId" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "PublicRoute" : {
      "Type" : "AWS::EC2::Route",
      "DependsOn" : "GatewayToInternet",
      "Properties" : {
        "RouteTableId" : { "Ref" : "PublicRouteTable" },
        "DestinationCidrBlock" : "0.0.0.0/0",
        "GatewayId" : { "Ref" : "InternetGateway" }
      }
    },

    "PublicSubnetRouteTableAssociation" : {
      "Type" : "AWS::EC2::SubnetRouteTableAssociation",
      "Properties" : {
        "SubnetId" : { "Ref" : "PublicSubnet" },
        "RouteTableId" : { "Ref" : "PublicRouteTable" }
      }
    },

    "PublicNetworkAcl" : {
      "Type" : "AWS::EC2::NetworkAcl",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackId" } },
          { "Key" : "Network", "Value" : "Public" }
        ]
      }
    },

    "InboundHTTPPublicNetworkAclEntry" : {
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "100",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "80", "To" : "80" }
      }
    },

    "InboundHTTPSPublicNetworkAclEntry" : {
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "101",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "443", "To" : "443" }
      }
    },

    "InboundSSHPublicNetworkAclEntry" : {
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "102",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : { "Ref" : "SSHLocation" },
        "PortRange" : { "From" : "22", "To" : "22" }
      }
    },

    "InboundEmphemeralPublicNetworkAclEntry" : {
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "103",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "1024", "To" : "65535" }
      }
    },

    "OutboundPublicNetworkAclEntry" : {
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" },
        "RuleNumber" : "100",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "true",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "0", "To" : "65535" }
      }
    },

    "PublicSubnetNetworkAclAssociation" : {
      "Type" : "AWS::EC2::SubnetNetworkAclAssociation",
      "Properties" : {
        "SubnetId" : { "Ref" : "PublicSubnet" },
        "NetworkAclId" : { "Ref" : "PublicNetworkAcl" }
      }
    },

    "PrivateSubnet" : {
      "Type" : "AWS::EC2::Subnet",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "CidrBlock" : { "Fn::FindInMap" : [ "SubnetConfig", "Private", "CIDR" ]},
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackId" } },
          { "Key" : "Network", "Value" : "Private" }
        ]
      }
    },

    "PrivateRouteTable" : {
      "Type" : "AWS::EC2::RouteTable",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackId" } },
          { "Key" : "Network", "Value" : "Private" }
        ]
      }
    },

    "PrivateSubnetRouteTableAssociation" : {
      "Type" : "AWS::EC2::SubnetRouteTableAssociation",
      "Properties" : {
        "SubnetId" : { "Ref" : "PrivateSubnet" },
        "RouteTableId" : { "Ref" : "PrivateRouteTable" }
      }
    },

    "PrivateRoute" : {
      "Type" : "AWS::EC2::Route",
      "Properties" : {
        "RouteTableId" : { "Ref" : "PrivateRouteTable" },
        "DestinationCidrBlock" : "0.0.0.0/0",
        "InstanceId" : { "Ref" : "NATDevice" }
      }
    },

    "PrivateNetworkAcl" : {
      "Type" : "AWS::EC2::NetworkAcl",
      "Properties" : {
        "VpcId" : { "Ref" : "VPC" },
        "Tags" : [
          { "Key" : "Application", "Value" : { "Ref" : "AWS::StackId" } },
          { "Key" : "Network", "Value" : "Private" }
        ]
      }
    },

    "InboundPrivateNetworkAclEntry" : {
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PrivateNetworkAcl" },
        "RuleNumber" : "100",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "false",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "0", "To" : "65535" }
      }
    },

    "OutBoundPrivateNetworkAclEntry" : {
      "Type" : "AWS::EC2::NetworkAclEntry",
      "Properties" : {
        "NetworkAclId" : { "Ref" : "PrivateNetworkAcl" },
        "RuleNumber" : "100",
        "Protocol" : "6",
        "RuleAction" : "allow",
        "Egress" : "true",
        "CidrBlock" : "0.0.0.0/0",
        "PortRange" : { "From" : "0", "To" : "65535" }
      }
    },

    "PrivateSubnetNetworkAclAssociation" : {
      "Type" : "AWS::EC2::SubnetNetworkAclAssociation",
      "Properties" : {
        "SubnetId" : { "Ref" : "PrivateSubnet" },
        "NetworkAclId" : { "Ref" : "PrivateNetworkAcl" }
      }
    },

    "NATIPAddress" : {
      "Type" : "AWS::EC2::EIP",
      "DependsOn" : "GatewayToInternet",
      "Properties" : {
        "Domain" : "vpc",
        "InstanceId" : { "Ref" : "NATDevice" }
      }
    },

    "NATDevice" : {
      "Type" : "AWS::EC2::Instance",
      "Properties" : {
        "InstanceType" : { "Ref" : "NATInstanceType" },
        "KeyName" : { "Ref" : "KeyName" },
        "SubnetId" : { "Ref" : "PublicSubnet" },
        "SourceDestCheck" : "false",
        "ImageId" : { "Fn::FindInMap" : [ "AWSNATAMI", { "Ref" : "AWS::Region" }, "AMI" ]},
        "SecurityGroupIds" : [{ "Ref" : "NATSecurityGroup" }]
      }
    },

    "NATSecurityGroup" : {
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Enable internal access to the NAT device",
        "VpcId" : { "Ref" : "VPC" },
        "SecurityGroupIngress" : [
           { "IpProtocol" : "tcp", "FromPort" : "80",  "ToPort" : "80",  "CidrIp" : "0.0.0.0/0"} ,
           { "IpProtocol" : "tcp", "FromPort" : "443", "ToPort" : "443", "CidrIp" : "0.0.0.0/0"} ,
           { "IpProtocol" : "tcp", "FromPort" : "22",  "ToPort" : "22",  "CidrIp" : { "Ref" : "SSHLocation" }} ],
        "SecurityGroupEgress" : [
           { "IpProtocol" : "tcp", "FromPort" : "80",  "ToPort" : "80",  "CidrIp" : "0.0.0.0/0"} ,
           { "IpProtocol" : "tcp", "FromPort" : "443", "ToPort" : "443", "CidrIp" : "0.0.0.0/0"} ]
      }
    },

    "BastionIPAddress" : {
      "Type" : "AWS::EC2::EIP",
      "DependsOn" : "GatewayToInternet",
      "Properties" : {
        "Domain" : "vpc",
        "InstanceId" : { "Ref" : "BastionHost" }
      }
    },

    "BastionHost" : {
      "Type" : "AWS::EC2::Instance",
      "Properties" : {
        "InstanceType" : { "Ref" : "BastionInstanceType" },
        "KeyName"  : { "Ref" : "KeyName" },
        "SubnetId" : { "Ref" : "PublicSubnet" },
        "ImageId"  : { "Fn::FindInMap" : [ "AWSRegionArch2AMI", { "Ref" : "AWS::Region" }, { "Fn::FindInMap" : [ "AWSInstanceType2Arch", { "Ref" : "BastionInstanceType" }, "Arch" ] } ] },
        "SecurityGroupIds" : [{ "Ref" : "BastionSecurityGroup" }]
      }
    },

    "BastionSecurityGroup" : {
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Enable access to the Bastion host",
        "VpcId" : { "Ref" : "VPC" },
        "SecurityGroupIngress" : [ { "IpProtocol" : "tcp", "FromPort" : "22",  "ToPort" : "22",  "CidrIp" : { "Ref" : "SSHLocation" }} ],
        "SecurityGroupEgress"  : [ { "IpProtocol" : "tcp", "FromPort" : "22",  "ToPort" : "22",  "CidrIp" : { "Fn::FindInMap" : [ "SubnetConfig", "Private", "CIDR" ]}}]
      }
    },

    "PublicElasticLoadBalancer" : {
      "Type" : "AWS::ElasticLoadBalancing::LoadBalancer",
      "Properties" : {
        "SecurityGroups" : [ { "Ref" : "PublicLoadBalancerSecurityGroup" } ],
        "Subnets" : [ { "Ref" : "PublicSubnet" } ],
        "Listeners" : [ { "LoadBalancerPort" : "80", "InstancePort" : "80", "Protocol" : "HTTP" } ],
        "HealthCheck" : {
          "Target" : "HTTP:80/",
          "HealthyThreshold" : "3",
          "UnhealthyThreshold" : "5",
          "Interval" : "90",
          "Timeout" : "60"
        }
      }
    },

    "PublicLoadBalancerSecurityGroup" : {
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Public ELB Security Group with HTTP access on port 80 from the internet",
        "VpcId" : { "Ref" : "VPC" },
        "SecurityGroupIngress" : [ { "IpProtocol" : "tcp", "FromPort" : "80", "ToPort" : "80", "CidrIp" : "0.0.0.0/0"} ],
        "SecurityGroupEgress" : [ { "IpProtocol" : "tcp", "FromPort" : "80", "ToPort" : "80", "CidrIp" : "0.0.0.0/0"} ]
      }
    },

    "FrontendFleet" : {
      "Type" : "AWS::AutoScaling::AutoScalingGroup",
      "Properties" : {
        "AvailabilityZones" : [{ "Fn::GetAtt" : [ "PrivateSubnet", "AvailabilityZone" ] }],
        "VPCZoneIdentifier" : [{ "Ref" : "PrivateSubnet" }],
        "LaunchConfigurationName" : { "Ref" : "FrontendServerLaunchConfig"  },
        "MinSize" : "1",
        "MaxSize" : "10",
        "DesiredCapacity" : { "Ref" : "FrontendSize" },
        "LoadBalancerNames" : [ { "Ref" : "PublicElasticLoadBalancer" } ],
        "Tags" : [ { "Key" : "Network", "Value" : "Public", "PropagateAtLaunch" : "true" } ]
      }
    },

    "FrontendServerLaunchConfig"  : {
      "Type" : "AWS::AutoScaling::LaunchConfiguration",
      "Metadata" : {
        "Comment1" : "Configure the FrontendServer to forward /backend requests to the backend servers",

        "AWS::CloudFormation::Init" : {
          "config" : {
            "packages" : {
              "yum" : {
                "httpd"        : []
              }
            },

            "files" : {
              "/var/www/html/index.html" : {
                "content" : { "Fn::Join" : ["\n", [
                  "<img src=\"https://s3.amazonaws.com/cloudformation-examples/cloudformation_graphic.png\" alt=\"AWS CloudFormation Logo\"/>",
                  "<h1>Congratulations, you have successfully launched the multi-tier AWS CloudFormation sample.</h1>",
                  "<p>This is a multi-tier web application launched in an Amazon Virtual Private Cloud (Amazon VPC) with multiple subnets. The first subnet is public and contains and internet facing load balancer, a NAT device for internet access from the private subnet and a bastion host to allow SSH access to the hosts in the private subnet. The second subnet is private and contains a Frontend fleet of EC2 instances, an internal load balancer and a Backend fleet of EC2 instances.",
                  "<p>To serve a web page from the backend service, click <a href=\"/backend\">here</a>.</p>"
                ]]},
                "mode"    : "000644",
                "owner"   : "root",
                "group"   : "root"
              },

              "/etc/httpd/conf.d/maptobackend.conf" : {
                "content" : { "Fn::Join" : ["", [
                   "ProxyPass /backend http://", { "Fn::GetAtt" : [ "PrivateElasticLoadBalancer", "DNSName" ]}, "\n",
                   "ProxyPassReverse /backend http://", { "Fn::GetAtt" : [ "PrivateElasticLoadBalancer", "DNSName" ]}, "\n"
                ]]},
                "mode"    : "000644",
                "owner"   : "root",
                "group"   : "root"
              }
            },

            "services" : {
              "sysvinit" : {
                "httpd" : {
                  "enabled"       : "true",
                  "ensureRunning" : "true",
                  "files"         : [ "/etc/httpd/conf.d/maptobackend.conf", "/var/www/html/index.html" ]
                }
              }
            }
          }
        }
      },
      "Properties" : {
        "ImageId"        : { "Fn::FindInMap" : [ "AWSRegionArch2AMI", { "Ref" : "AWS::Region" }, { "Fn::FindInMap" : [ "AWSInstanceType2Arch", { "Ref" : "FrontendInstanceType" }, "Arch" ] } ] },
        "SecurityGroups" : [ { "Ref" : "FrontendSecurityGroup" } ],
        "InstanceType"   : { "Ref" : "FrontendInstanceType" },
        "KeyName"        : { "Ref" : "KeyName" },
        "UserData"       : { "Fn::Base64" : { "Fn::Join" : ["", [
          "#!/bin/bash -v\n",
          "yum update -y aws-cfn-bootstrap\n",

          "# Install Apache and configure as a reverse Frontend\n",
          "/opt/aws/bin/cfn-init --stack ", { "Ref" : "AWS::StackId" }, " --resource FrontendServerLaunchConfig ",
          "    --region ", { "Ref" : "AWS::Region" }, "\n",

          "# Signal completion\n",
          "/opt/aws/bin/cfn-signal -e $? -r \"Frontend setup done\" '", { "Ref" : "FrontendWaitHandle" }, "'\n"
        ]]}}
      }
    },

    "FrontendSecurityGroup" : {
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Allow access from load balancer and bastion as well as outbound HTTP and HTTPS traffic",
        "VpcId" : { "Ref" : "VPC" },
        "SecurityGroupIngress" : [
          { "IpProtocol" : "tcp", "FromPort" : "80", "ToPort" : "80", "SourceSecurityGroupId" : { "Ref" : "PublicLoadBalancerSecurityGroup" } } ,
          { "IpProtocol" : "tcp", "FromPort" : "22", "ToPort" : "22", "SourceSecurityGroupId" : { "Ref" : "BastionSecurityGroup" } } ],
        "SecurityGroupEgress" : [
           { "IpProtocol" : "tcp", "FromPort" : "80",  "ToPort" : "80",  "CidrIp" : "0.0.0.0/0" } ,
           { "IpProtocol" : "tcp", "FromPort" : "443", "ToPort" : "443", "CidrIp" : "0.0.0.0/0" } ]
      }
    },

    "FrontendWaitHandle" : {
      "Type" : "AWS::CloudFormation::WaitConditionHandle"
    },

    "FrontendWaitCondition" : {
      "Type" : "AWS::CloudFormation::WaitCondition",
      "DependsOn" : "FrontendFleet",
      "Properties" : {
        "Handle"  : { "Ref" : "FrontendWaitHandle" },
        "Timeout" : "300",
        "Count"   : { "Ref" : "FrontendSize" }
      }
    },


    "PrivateElasticLoadBalancer" : {
      "Type" : "AWS::ElasticLoadBalancing::LoadBalancer",
      "Properties" : {
        "SecurityGroups" : [ { "Ref" : "PrivateLoadBalancerSecurityGroup" } ],
        "Subnets" : [ { "Ref" : "PrivateSubnet" } ],
        "Listeners" : [ { "LoadBalancerPort" : "80", "InstancePort" : "80", "Protocol" : "HTTP" } ],
        "Scheme" : "internal",
        "HealthCheck" : {
          "Target" : "HTTP:80/",
          "HealthyThreshold" : "3",
          "UnhealthyThreshold" : "5",
          "Interval" : "90",
          "Timeout" : "60"
        }
      }
    },

    "PrivateLoadBalancerSecurityGroup" : {
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Private ELB Security Group with HTTP access on port 80 from the Frontend Fleet only",
        "VpcId" : { "Ref" : "VPC" },
        "SecurityGroupIngress" : [ { "IpProtocol" : "tcp", "FromPort" : "80", "ToPort" : "80", "SourceSecurityGroupId" : { "Ref" : "FrontendSecurityGroup" } } ],
        "SecurityGroupEgress" : [ { "IpProtocol" : "tcp", "FromPort" : "80", "ToPort" : "80", "CidrIp" : "0.0.0.0/0" } ]
      }
    },

    "BackendFleet" : {
      "Type" : "AWS::AutoScaling::AutoScalingGroup",
      "Properties" : {
        "AvailabilityZones" : [{ "Fn::GetAtt" : [ "PrivateSubnet", "AvailabilityZone" ] }],
        "VPCZoneIdentifier" : [{ "Ref" : "PrivateSubnet" }],
        "LaunchConfigurationName" : { "Ref" : "BackendLaunchConfig"  },
        "MinSize" : "1",
        "MaxSize" : "10",
        "DesiredCapacity" : { "Ref" : "BackendSize" },
        "LoadBalancerNames" : [ { "Ref" : "PrivateElasticLoadBalancer" } ],
        "Tags" : [ { "Key" : "Network", "Value" : "Private", "PropagateAtLaunch" : "true" } ]
      }
    },

    "BackendLaunchConfig"  : {
      "Type" : "AWS::AutoScaling::LaunchConfiguration",
      "Metadata" : {
        "Comment1" : "Configure the Backend server to respond to requests",

        "AWS::CloudFormation::Init" : {
          "config" : {
            "packages" : {
              "yum" : {
                "httpd"        : []
              }
            },

            "files" : {
              "/var/www/html/index.html" : {
                "content" : { "Fn::Join" : ["\n", [
                   "<img src=\"https://s3.amazonaws.com/cloudformation-examples/cloudformation_graphic.png\" alt=\"AWS CloudFormation Logo\"/>",
                   "<h1>Congratulations, this request was served from the backend fleet</h1>"
                ]]},
                "mode"    : "000644",
                "owner"   : "root",
                "group"   : "root"
              }
            },

            "services" : {
              "sysvinit" : {
                "httpd" : {
                  "enabled"       : "true",
                  "ensureRunning" : "true",
                  "files"         : [ "/var/www/html/index.html" ]
                }
              }
            }
          }
        }
      },
      "Properties" : {
        "ImageId"        : { "Fn::FindInMap" : [ "AWSRegionArch2AMI", { "Ref" : "AWS::Region" }, { "Fn::FindInMap" : [ "AWSInstanceType2Arch", { "Ref" : "BackendInstanceType" }, "Arch" ] } ] },
        "SecurityGroups" : [ { "Ref" : "BackendSecurityGroup" } ],
        "InstanceType"   : { "Ref" : "BackendInstanceType" },
        "KeyName"        : { "Ref" : "KeyName" },
        "UserData"       : { "Fn::Base64" : { "Fn::Join" : ["", [
          "#!/bin/bash -v\n",
          "yum update -y aws-cfn-bootstrap\n",

          "# Install Apache\n",
          "/opt/aws/bin/cfn-init --stack ", { "Ref" : "AWS::StackId" }, " --resource BackendLaunchConfig ",
          "    --region ", { "Ref" : "AWS::Region" }, "\n",

          "# Signal completion\n",
          "/opt/aws/bin/cfn-signal -e $? -r \"Backend setup done\" '", { "Ref" : "BackendWaitHandle" }, "'\n"
        ]]}}
      }
    },

    "BackendSecurityGroup" : {
      "Type" : "AWS::EC2::SecurityGroup",
      "Properties" : {
        "GroupDescription" : "Allow access from private load balancer and bastion as well as outbound HTTP and HTTPS traffic",
        "VpcId" : { "Ref" : "VPC" },
        "SecurityGroupIngress" : [
          { "IpProtocol" : "tcp", "FromPort" : "80", "ToPort" : "80", "SourceSecurityGroupId" : { "Ref" : "PrivateLoadBalancerSecurityGroup" } } ,
          { "IpProtocol" : "tcp", "FromPort" : "22", "ToPort" : "22", "SourceSecurityGroupId" : { "Ref" : "BastionSecurityGroup" } } ],
        "SecurityGroupEgress" : [
           { "IpProtocol" : "tcp", "FromPort" : "80",  "ToPort" : "80",  "CidrIp" : "0.0.0.0/0" } ,
           { "IpProtocol" : "tcp", "FromPort" : "443", "ToPort" : "443", "CidrIp" : "0.0.0.0/0" } ]
      }
    },

    "BackendWaitHandle" : {
      "Type" : "AWS::CloudFormation::WaitConditionHandle"
    },

    "BackendWaitCondition" : {
      "Type" : "AWS::CloudFormation::WaitCondition",
      "DependsOn" : "BackendFleet",
      "Properties" : {
        "Handle"  : { "Ref" : "BackendWaitHandle" },
        "Timeout" : "300",
        "Count"   : { "Ref" : "BackendSize" }
      }
    }
  },

  "Outputs" : {
    "WebSite" : {
      "Description" : "URL of the website",
      "Value" :  { "Fn::Join" : [ "", [ "http://", { "Fn::GetAtt" : [ "PublicElasticLoadBalancer", "DNSName" ]}]]}
    },
    "Bastion" : {
      "Description" : "IP Address of the Bastion host",
      "Value" :  { "Ref" : "BastionIPAddress" }
    }
  }
}
```

---

|||aws acl accesslist access list cloudformation

|||acl-accesslist-access-list-cloudformation-template-parameters-dev.json

```json
{
    "DefaultExampleIdOfPrivateRouteTable0": "rtb-4heouihr",
    "DefaultExampleIdOfPrivateRouteTable1": "rtb-3u4yriio",
    "DefaultExampleIdOfPrivateRouteTable2": "rtb-wmdhhiuo",
    "DefaultExampleSubnetAccesslist": "acl-ewuhrioij",
    "DefaultExampleIngressEntryRuleNumber": "100",
    "DefaultExampleEgressExitRuleNumber": "100",
    "DestinationCidrBlock": "10.4.64.0/18",
    "DefaultExampleIdOfVpcPeeringConnection": "pcx-eruyf8wy"
}
```

|||acl-accesslist-access-list-cloudformation-template.json

```json
{
    "Description": "Accesslists and network routing rules to allow cross-service access.",
    "AWSTemplateFormatVersion": "2010-09-09",
    "Parameters": {
        "DefaultExampleIdOfVpcPeeringConnection": {
            "Description": "VPC Id of the peering AWS account.",
            "Type": "String"
        },
        "DestinationCidrBlock": {
            "Description": "Destination CIDR block.",
            "Type": "String"
        },
        "DefaultExampleSubnetAccesslist": {
            "Description": "Network access list id for subnets.",
            "Type": "String"
        },
        "DefaultExampleIngressEntryRuleNumber": {
            "Description": "Rule number for entry rule.",
            "Type": "String"
        },
        "DefaultExampleEgressExitRuleNumber": {
            "Description": "Rule number for exit rule.",
            "Type": "String"
        },
        "DefaultExampleIdOfPrivateRouteTable0": {
            "Description": "Private route table id for zone A",
            "Type": "String"
        },
        "DefaultExampleIdOfPrivateRouteTable1": {
            "Description": "Private route table id for zone B",
            "Type": "String"
        },
        "DefaultExampleIdOfPrivateRouteTable2": {
            "Description": "Private route table id for zone C",
            "Type": "String"
        },
    },
    "Resources": {
        "AllowAccountEgressDefaultExampleSubnetAccesslistEntry": {
            "Properties": {
                "CidrBlock": {
                    "Ref": "DestinationCidrBlock"
                },
                "Egress": "true",
                "NetworkAclId": {
                    "Ref": "DefaultExampleSubnetAccesslist"
                },
                "PortRange": {
                    "From": "4545",
                    "To": "4545"
                },
                "Protocol": "6",
                "RuleAction": "Allow",
                "RuleNumber": {
                    "Ref": "DefaultExampleEgressExitRuleNumber"
                }
            },
            "Type": "AWS::EC2::NetworkAclEntry"
        },
        "AllowAccountIngressDefaultExampleSubnetAccesslistEntry": {
            "Properties": {
                "CidrBlock": {
                    "Ref": "DestinationCidrBlock"
                },
                "Egress": "false",
                "NetworkAclId": {
                    "Ref": "DefaultExampleSubnetAccesslist"
                },
                "PortRange": {
                    "From": "0",
                    "To": "65535"
                },
                "Protocol": "6",
                "RuleAction": "Allow",
                "RuleNumber": {
                    "Ref": "DefaultExampleIngressEntryRuleNumber"
                }
            },
            "Type": "AWS::EC2::NetworkAclEntry"
        },
        "Route0": {
            "Properties": {
                "DestinationCidrBlock": {
                    "Ref": "DestinationCidrBlock"
                },
                "VpcPeeringConnectionId": {
                    "Ref": "DefaultExampleIdOfVpcPeeringConnection"
                },
                "RouteTableId": {
                    "Ref": "DefaultExampleIdOfPrivateRouteTable0"
                }
            },
            "Type": "AWS::EC2::Route"
        },
        "Route1": {
            "Properties": {
                "DestinationCidrBlock": {
                    "Ref": "DestinationCidrBlock"
                },
                "VpcPeeringConnectionId": {
                    "Ref": "DefaultExampleIdOfVpcPeeringConnection"
                },
                "RouteTableId": {
                    "Ref": "DefaultExampleIdOfPrivateRouteTable1"
                }
            },
            "Type": "AWS::EC2::Route"
        },
        "Route2": {
            "Properties": {
                "DestinationCidrBlock": {
                    "Ref": "DestinationCidrBlock"
                },
                "VpcPeeringConnectionId": {
                    "Ref": "DefaultExampleIdOfVpcPeeringConnection"
                },
                "RouteTableId": {
                    "Ref": "DefaultExampleIdOfPrivateRouteTable2"
                }
            },
            "Type": "AWS::EC2::Route"
        }
    }
}
```

---

|||aws redis cloudformation
|||redis-cloudformation-template-parameters-dev.json

```json
{
    "DefaultExampleSubnetGroupSubnetIdentity1": "subnet-23r3rter",
    "DefaultExampleSubnetGroupSubnetIdentity2": "subnet-ty56u56u",
    "DefaultExampleSubnetGroupSubnetIdentity3": "subnet-789oyui6",
    "DefaultExampleEnv": "dev",
    "NumCacheNodes": "2",
    "CacheNodeTypeNew": "cache.m3.medium",
    "CacheNodeType": "cache.t2.micro",
    "VpcId": "vpc-1e78tuqwd"
}
```

|||redis-cloudformation-template.json

```json
{
    "Resources": {
        "SubnetGroup" : {
            "Type" : "AWS::ElastiCache::SubnetGroup",
            "Properties" : {
                "Description" : {
                    "Fn::Join": [
                        " ",
                        [
                            "Subnet group for Redis cache, for",
                            {
                                "Ref": "DefaultExampleEnv"
                            }
                        ]
                    ]
                },
                "SubnetIds" : [
                    {
                        "Ref": "DefaultExampleSubnetGroupSubnetIdentity1"
                    },
                    {
                        "Ref": "DefaultExampleSubnetGroupSubnetIdentity2"
                    },
                    {
                        "Ref": "DefaultExampleSubnetGroupSubnetIdentity3"
                    }
                ]
            }
        }
        "ElasticacheSecurityGroup": {
            "Type": "AWS::EC2::SecurityGroup",
            "Properties": {
                "GroupDescription": {
                    "Fn::Join": [
                        " ",
                        [
                            "Redis security group for",
                            {
                                "Ref": "DefaultExampleEnv"
                            }
                        ]
                    ]
                },
                "SecurityGroupIngress": [ {
                    "IpProtocol": "tcp",
                    "FromPort": "6379",
                    "ToPort": "6379",
                    "CidrIp": "10.0.0.0/0"
                } ],
                "SecurityGroupEgress" : [ {
                    "IpProtocol" : "-1",
                    "FromPort" : "0",
                    "ToPort" : "65535",
                    "CidrIp" : "10.0.0.0/0"
                } ],
                "VpcId": {
                    "Ref": "VpcId"
                }
            }
        },
        "ElasticacheParameterGroup": {
            "Type": "AWS::ElastiCache::ParameterGroup",
            "Properties": {
                "CacheParameterGroupFamily" : "redis2.8",
                "Description" : "Cache Parameter Group",
                "Properties": {
                    "timeout" : "86400"
                }
            }
        },
        "ElasticacheCluster": {
            "Type": "AWS::ElastiCache::CacheCluster",
            "Properties": {
                "Engine": "redis",
                "ClusterName": {
                    "Fn::Join": [
                        "-",
                        [
                            {
                                "Ref": "DefaultExampleEnv"
                            },
                            "name-of-application"
                        ]
                    ]
                },
                "VpcSecurityGroupIds": [ {
                    "Fn::GetAtt": [ "ElasticacheSecurityGroup", "GroupId" ]
                } ],
                "NumCacheNodes": {
                    "Ref": "NumCacheNodes"
                },
                "EngineVersion": "2.8.6",
                "CacheNodeType": {
                    "Ref": "CacheNodeType"
                },
                "Port": 6379,
                "CacheSubnetGroupName": {
                    "Ref": "SubnetGroup"
                },
                "CacheParameterGroupName": {
                    "Ref": "ElasticacheParameterGroup"
                }
            }
        },
        "ElasticacheClusterRedux": {
            "Type": "AWS::ElastiCache::CacheCluster",
            "Properties": {
                "Engine": "redis",
                "ClusterName": {
                    "Fn::Join": [
                        "-",
                        [
                            {
                                "Ref": "DefaultExampleEnv"
                            },
                            "name-of-application-redis"
                        ]
                    ]
                },
                "VpcSecurityGroupIds": [ {
                    "Fn::GetAtt": [ "ElasticacheSecurityGroup", "GroupId" ]
                } ],
                "NumCacheNodes": {
                    "Ref": "NumCacheNodes"
                },
                "EngineVersion": "2.8.6",
                "CacheNodeType": {
                    "Ref": "CacheNodeTypeNew"
                },
                "SnapshotName": {
                    "Fn::Join": [
                        "-",
                        [
                            {
                                "Ref": "DefaultExampleEnv"
                            },
                            "name-of-application-redis"
                        ]
                    ]
                },
                "Port": 6379,
                "CacheSubnetGroupName": {
                    "Ref": "SubnetGroup"
                },
                "CacheParameterGroupName": {
                    "Ref": "ElasticacheParameterGroup"
                }
            }
        }
    },
    "Description": "Default example description Redis.",
    "Parameters": {
        "DefaultExampleEnv": {
            "Type": "String",
            "Description": "DefaultExampleEnv e.g. int, test, stage, production."
        },
        "DefaultExampleSubnetGroupSubnetIdentity1": {
            "Type": "String",
            "Description": "Subnet 1 id."
        },
        "DefaultExampleSubnetGroupSubnetIdentity2": {
            "Type": "String",
            "Description": "Subnet 2 id."
        },
        "DefaultExampleSubnetGroupSubnetIdentity3": {
            "Type": "String",
            "Description": "Subnet 3 id."
        }
        "VpcId": {
            "Type": "String",
            "Description": "VPC Id hosting the environment."
        },
                "CacheNodeType": {
            "Type": "String",
            "Description": "Instance type for Redis, e.g. cache.t2.micro."
        },
        "CacheNodeTypeNew": {
            "Type": "String",
            "Description": "Instance type for Redis, e.g. cache.m3.medium"
        },
        "NumCacheNodes": {
            "Type": "String",
            "Description": "Cache nodes number in Redis cluster."
        }
    }
}
```

---

|||aws mysql cloudformation

|||mysql-cloudformation-template-parameters-dev.json

```json
{
  "DefaultExampleVpcIdentity": "vpc-378e387y",
  "DefaultExamplePrivateSubnetIdentity1": "subnet-awqer3r4",
  "DefaultExamplePrivateSubnetIdentity2": "subnet-5436ffdg",
  "DefaultExamplePrivateSubnetIdentity3": "subnet-45yrttgn",
  "DefaultExampleNameOfUser": "DefaultExampleNameOfUser",
  "DefaultExampleNameOfDB": "DefaultExampleNameOfDB"
}
```

|||mysql-cloudformation-template.json

```json
{
  "AWSTemplateFormatVersion": "2014-10-10",
  "Resources": {
    "defaultExampleRDSSecurityGroupMonitoring": {
      "Type": "AWS::RDS::DBSecurityGroup",
      "Properties": {
        "EC2DefaultExampleVpcIdentity": {
          "Ref": "DefaultExampleVpcIdentity"
        },
        "DBSecurityGroupIngress": [
          {
            "EC2SecurityGroupId": {
              "Ref": "defaultExampleSecurityGroupMonitoringGroup"
            }
          }
        ],
        "GroupDescription": "RDS monitoring security group."
      }
    },
    "defaultExampleDBParameterGroupMonitoring": {
      "Type": "AWS::RDS::DBParameterGroup",
      "Properties": {
        "Family": "mysql5.6",
        "Description": "DBParameterGroup monitoring.",
        "Parameters": {
          "explicit_defaults_for_timestamp": "FALSE"
        }
      }
    },
    "defaultExampleSecurityGroupMonitoringGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "DefaultExampleVpcIdentity": {
          "Ref": "DefaultExampleVpcIdentity"
        },
        "GroupDescription": "Security Group, which can access the RDS, monitoring EC2."
      }
    },
    "defaultExampleDBJSONFieldName": {
      "Type": "AWS::RDS::DBInstance",
      "Properties": {
        "Engine": "MySQL",
        "StorageType": "gp2",
        "DBParameterGroupName": {
          "Ref": "defaultExampleDBParameterGroupMonitoring"
        },
        "DBSecurityGroups": [
          {
            "Ref": "defaultExampleRDSSecurityGroupMonitoring"
          }
        ],
        "MultiAZ": "False",
        "MasterUsername": {
          "Ref": "DefaultExampleNameOfUser"
        },
        "MasterUserPassword": {
          "Ref": "DefaultExamplePasswordForDB"
        },
        "AllocatedStorage": "5",
        "DBInstanceClass": {
          "Ref": "DefaultExampleTypeOfDBInstance"
        },
        "DBSubnetGroupName": {
          "Ref": "RDSSubnets"
        },
        "DefaultExampleNameOfDB": {
          "Ref": "DefaultExampleNameOfDB"
        }
      }
    },
    "RDSSubnets": {
      "Type": "AWS::RDS::DBSubnetGroup",
      "Properties": {
        "SubnetIds": [
          {
            "Ref": "DefaultExamplePrivateSubnetIdentity1"
          },
          {
            "Ref": "DefaultExamplePrivateSubnetIdentity2"
          },
          {
            "Ref": "DefaultExamplePrivateSubnetIdentity3"
          }
        ],
        "DBSubnetGroupDescription": "The RDS will sit in these private subnets."
      }
    }
  },
  "Description": "Some default example DB description.",
  "Parameters": {
    "DefaultExampleVpcIdentity": {
      "Type": "String",
      "Description": "VPC id."
    },
    "DefaultExampleTypeOfDBInstance": {
      "Default": "db.t2.small",
      "Type": "String",
      "Description": "DB instance type e.g. db.m2.xlarge."
    },
    "DefaultExamplePrivateSubnetIdentity1": {
      "Type": "String",
      "Description": "Private subnet 1 id."
    },
    "DefaultExamplePrivateSubnetIdentity2": {
      "Type": "String",
      "Description": "Private subnet 2 id."
    },
    "DefaultExamplePrivateSubnetIdentity3": {
      "Type": "String",
      "Description": "Private subnet 3 id."
    },
    "DefaultExampleNameOfDB": {
      "Default": "defaultExampleNameOfDB",
      "Type": "String",
      "Description": "DB name."
    },
    "DefaultExamplePasswordForDB": {
      "Default": "defaultExamplePasswordForDB",
      "Type": "String",
      "Description": "DB password."
    },
    "DefaultExampleNameOfUser": {
      "Default": "defaultExampleNameOfUser",
      "Type": "String",
      "Description": "DB username."
    }
  }
}
```

---

|||aws jenkins slave cloudformation

|||jenkins-slave-cloudformation-template-parameters-dev.json

```json
{
  "DefaultExampleApplicationName": "default-example-jenkins-master",
  "DefaultExampleNameOfProject": "defaultExampleProject",
  "DefaultExampleSlaveSecurityGroup": "sl-uqhwdiuh",
  "Subdomain": "default-example-jenkins-master",
  "DomainNameBase": "iyr2yqru234.com."
  "InstanceType": "m3.medium",
  "Environment": "dev",
  "MinimumSize": 1,
  "MaximumSize": 1,
  "DefaultExampleDevAccessRole": "arn:aws:iam::456896823445790:role/defaultExampleDevAccessRole-5H3GRM16HQ8W"
}
```

|||jenkins-slave-cloudformation-template.json

```json
{
  "Description": "AWS Cloud Jenkins Slaves Main Pile",
  "Parameters": {
    "DefaultExampleApplicationName": {
      "Description": "Project Name",
      "Type": "String"
    },
    "DefaultExampleSlaveSecurityGroup": {
      "Description": "ID of Security Group in which to place agents in.",
      "Type": "String"
    },
    "DefaultExampleNameOfProject": {
      "Description": "Name of project.",
      "Type": "String"
    },
    "Environment": {
      "Description": "Environment",
      "AllowedValues": [
        "int",
        "test",
        "stage",
        "production"
      ],
      "Type": "String"
    },
    "VpcId": {
      "Description": "VPC ID to attach the environment to.",
      "Type": "String"
    },
    "KeyName": {
      "Description": "Name of SSH Key.",
      "Default": "example-default",
      "Type": "String"
    },
    "BastionSecurityGroup": {
      "Description": "Bastion access security group.",
      "Type": "String"
    },
    "InstanceType": {
      "Description": "AWS image type.",
      "Type": "String"
    },
    "ImageId": {
      "Description": "AWS AMI.",
      "Type": "String"
    },
    "MinimumSize": {
      "Description": "Minimum number of ec2 instances",
      "Type": "String"
    },
    "MaximumSize": {
      "Description": "Maximum number of ec2 instances",
      "Type": "String"
    },
    "PrivateSubnet1Id": {
      "Description": "Private subnet 1 ID.",
      "Type": "String"
    },
    "PrivateSubnet2Id": {
      "Description": "Private subnet 2 ID.",
      "Type": "String"
    },
    "PrivateSubnet3Id": {
      "Description": "Private subnet 3 ID.",
      "Type": "String"
    },
    "PublicSubnet1Id": {
      "Description": "Public subnet 1 ID.",
      "Type": "String"
    },
    "PublicSubnet2Id": {
      "Description": "Public subnet 2 ID.",
      "Type": "String"
    },
    "PublicSubnet3Id": {
      "Description": "Public subnet 3 ID.",
      "Type": "String"
    },
    "DefaultExampleDevAccessRole": {
      "Description": "Default example role to assume to access the dev account.",
      "Type": "String"
    }
  },
  "Outputs": {
    "DefaultExampleLogGroup": {
      "Description": "Name of Log Group for awslogs configuration.",
      "Value": {
        "Ref": "JenkinsAgentsDefaultExampleLogGroup"
      }
    }
  },
  "Resources": {
    "ScalingGroup": {
      "Type": "AWS::AutoScaling::AutoScalingGroup",
      "UpdatePolicy": {
        "AutoScalingRollingUpdate": {
          "PauseTime": "PT0S",
          "MaxBatchSize": "1",
          "MinInstancesInService": "0"
        }
      },
      "Properties": {
        "AvailabilityZones": {
          "Fn::GetAZs": ""
        },
        "MinimumSize": {
          "Ref": "MinimumSize"
        },
        "MaximumSize": {
          "Ref": "MaximumSize"
        },
        "LaunchConfigurationName": {
          "Ref": "LaunchConfiguration"
        },
        "Tags": [
          {
            "Key": "DefaultExampleComponent",
            "Value": {
              "Ref": "DefaultExampleNameOfProject"
            },
            "PropagateAtLaunch": true
          },
          {
            "Key": "DefaultExampleProject",
            "Value": {
              "Ref": "DefaultExampleApplicationName"
            },
            "PropagateAtLaunch": true
          }
        ],
        "VPCZoneIdentifier": [
          {
            "Ref": "PrivateSubnet1Id"
          },
          {
            "Ref": "PrivateSubnet2Id"
          },
          {
            "Ref": "PrivateSubnet3Id"
          }
        ]
      }
    },
    "LaunchConfiguration": {
      "Type": "AWS::AutoScaling::LaunchConfiguration",
      "Properties": {
        "AssociatePublicIpAddress": false,
        "BlockDeviceMappings": [
          {
            "DeviceName": "/dev/sda1",
            "Ebs": {
              "DeleteOnTermination": true,
              "VolumeSize": "100",
              "VolumeType": "gp2"
            }
          }
        ],
        "ImageId": {
          "Ref": "ImageId"
        },
        "IamInstanceProfile": {
          "Ref": "Profile"
        },
        "InstanceType": {
          "Ref": "InstanceType"
        },
        "KeyName": {
          "Ref": "KeyName"
        },
        "SecurityGroups": [
          {
            "Ref": "DefaultExampleSlaveSecurityGroup"
          },
          {
            "Ref": "BastionSecurityGroup"
          }
        ]
      }
    },
    "ScaleAlarm": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "AlarmActions": [
          {
            "Ref": "ScalingPolicyUp"
          }
        ],
        "AlarmDescription": "Auto scaling policy",
        "AlarmName": {
          "Fn::Join": [
            "-",
            [
              {
                "Ref": "Environment"
              },
              {
                "Ref": "DefaultExampleNameOfProject"
              },
              "ScaleUp"
            ]
          ]
        },
        "ComparisonOperator": "GreaterThanThreshold",
        "Dimensions": [
          {
            "Name": "AutoScalingGroupName",
            "Value": {
              "Ref": "ScalingGroup"
            }
          }
        ],
        "EvaluationPeriods": "1",
        "MetricName": "CPUUtilization",
        "Namespace": "AWS/EC2",
        "OKActions": [
          {
            "Ref": "ScalingPolicyDown"
          }
        ],
        "Period": "300",
        "Statistic": "Average",
        "Threshold": "80"
      }
    },
    "ScalingPolicyUp": {
      "Type": "AWS::AutoScaling::ScalingPolicy",
      "Properties": {
        "AdjustmentType": "ChangeInCapacity",
        "AutoScalingGroupName": {
          "Ref": "ScalingGroup"
        },
        "Cooldown": "1200",
        "ScalingAdjustment": "1"
      }
    },
    "ScalingPolicyDown": {
      "Type": "AWS::AutoScaling::ScalingPolicy",
      "Properties": {
        "AdjustmentType": "ChangeInCapacity",
        "AutoScalingGroupName": {
          "Ref": "ScalingGroup"
        },
        "Cooldown": "300",
        "ScalingAdjustment": "-1"
      }
    },
    "Profile": {
      "Type": "AWS::IAM::InstanceProfile",
      "Properties": {
        "Path": "/",
        "Roles": [
          {
            "Ref": "Role"
          }
        ]
      }
    },
    "Role": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "ec2.amazonaws.com"
                ]
              }
            }
          ]
        }
      }
    },
    "Policy": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "Roles": [
          {
            "Ref": "Role"
          }
        ],
        "PolicyName": "Policy",
        "PolicyDocument": {
          "Statement": [
            {
              "Action": ["logs:*"],
              "Resource": ["arn:aws:logs:*:*:*"],
              "Effect": "Allow"
            },
            {
              "Effect": "Allow",
              "Action": [ "sts:AssumeRole" ],
              "Resource": [ { "Ref": "DefaultExampleDevAccessRole"} ]
            },
            {
              "Effect": "Allow",
              "Action": "ec2:Describe*",
              "Resource": "*"
            },
            {
              "Effect": "Allow",
              "Action": "elasticloadbalancing:Describe*",
              "Resource": "*"
            },
            {
              "Effect": "Allow",
              "Action": [
                "cloudwatch:ListMetrics",
                "cloudwatch:GetMetricStatistics",
                "cloudwatch:Describe*"
              ],
              "Resource": "*"
            },
            {
              "Effect": "Allow",
              "Action": "autoscaling:Describe*",
              "Resource": "*"
            },
            {
              "Effect": "Allow",
              "Action": [
                "lambda:GetFunction",
                "lambda:UploadFunction",
                "lambda:UpdateFunctionCode",
                "lambda:UpdateFunctionConfiguration"
              ],
              "Resource": "arn:aws:lambda:*"
            }
          ]
        }
      }
    },
    "JenkinsAgentsDefaultExampleLogGroup": {
      "Type": "AWS::Logs::DefaultExampleLogGroup",
      "Properties": {
        "RetentionInDays": 15
      }
    }
  }
}
```

---

|||aws jenkins master cloudformation
|||jenkins-master-cloudformation-template-parameters-dev.json

```json
{
  "DefaultExampleApplicationName": "default-example-jenkins-master",
  "DefaultExampleNameOfProject": "defaultExampleProject",
  "Subdomain": "default-example-jenkins-master",
  "DomainNameBase": "7823y7r378y2347834.xhst.com."
  "InstanceType": "m3.medium",
  "Environment": "dev",
}
```

|||jenkins-master-cloudformation-template.json

```json
{
  "Description": "AWS Cloud Jenkins Master",
  "Parameters": {
    "BackupS3Path": {
      "Description": "Path used to store S3 backups, backups will be after 30 days from this path.",
      "Type": "String",
      "Default": "default-example-jenkins-backups/"
    },
    "DefaultExampleS3BackupsExpirationInDays" : {
      "Description": "Keep backups in S3 for [N] number of days.",
      "Type": "Number",
      "Default": 30
    },
    "DefaultExampleApplicationName": {
      "Description": "Name of application.",
      "Type": "String"
    },
    "DefaultExampleNameOfProject": {
      "Description": "Name of project.",
      "Type": "String"
    },
    "Environment": {
      "Description": "Environment",
      "AllowedValues": [
        "int",
        "test",
        "stage",
        "production"
      ],
      "Type": "String"
    },
    "Subdomain": {
      "Description": "Subdomain",
      "Type": "String"
    },
    "VpcId": {
      "Description": "VPC id.",
      "Type": "String"
    },
    "KeyName": {
      "Description": "Name of SSH key.",
      "Default": "defaultExampleSSHKeyName",
      "Type": "String"
    },
    "BastionSecurityGroup": {
      "Description": "Bastion security group",
      "Type": "String"
    },
    "InstanceType": {
      "Description": "AWS ec2 instance.,
      "Type": "String"
    },
    "ImageId": {
      "Description": "AWS AMI image.",
      "Type": "String"
    },
    "JenkinsJNLPSlavePort": {
      "Type": "String",
      "Default": "34624",
      "Description": "Port to allow connection with Jenkins slaves."
    },
    "DomainNameBase": {
      "Description": "Domain name base.",
      "Default": "default.example.com.",
      "Type": "String"
    },
    "PublicSubnet1Id": {
      "Description": "The id of public subnet 1",
      "Type": "String"
    },
    "PublicSubnet2Id": {
      "Description": "The id of public subnet 2",
      "Type": "String"
    },
    "PublicSubnet3Id": {
      "Description": "The id of public subnet 3",
      "Type": "String"
    },
    "PrivateSubnet1Id": {
      "Description": "The id of private subnet 1",
      "Type": "String"
    },
    "PrivateSubnet2Id": {
      "Description": "The id of private subnet 2",
      "Type": "String"
    },
    "PrivateSubnet3Id": {
      "Description": "The id of private subnet 3",
      "Type": "String"
    }
  },
  "Outputs": {
    "DefaultExampleMasterSecurityGroup": {
      "Description": "Master security group's ID.",
      "Value": {
        "Ref": "DefaultExampleMasterSecurityGroup"
      }
    },
    "DefaultExampleSlaveSecurityGroup": {
      "Description": "Slave security group's ID for Jenkins agents.",
      "Value": {
        "Ref": "DefaultExampleSlaveSecurityGroup"
      }
    },
    "DefaultExampleSlaveSecurityGroup": {
      "Description": "Internal hostname needed for Jenkins agents to access master.",
      "Value": {
        "Ref": "InternalHostname"
      }
    },
    "DefaultExampleExternalHostName": {
      "Description": "External hostname for the Jenkins master to create a CNAME.",
      "Value": {
        "Ref": "ComponentDNS"
      }
    },
    "DefaultExampleJenkinsBackupBucket": {
      "Description": "S3 Bucket for Jenkins to put backups in.",
      "Value": {
        "Ref": "S3Bucket"
      }
    },
    "DefaultExampleJenkinsBackupBucketArn": {
      "Description": "Arn of S3 Bucket for Jenkins to put backups in.",
      "Value": {
        "Fn::Join" : ["", ["arn:aws:s3:::", {"Ref": "S3Bucket"}]]
      }
    },
    "DefaultExample": {
      "Description": "Name of Log Group for awslogs configuration.",
      "Value": {
        "Ref": "JenkinsDefaultExample"
      }
    }
  },
  "Resources": {
    "Instance": {
      "Type": "AWS::AutoScaling::AutoScalingGroup",
      "UpdatePolicy": {
        "AutoScalingRollingUpdate": {
          "PauseTime": "PT0S",
          "MaxBatchSize": "1",
          "MinInstancesInService": "0"
        }
      },
      "Properties": {
        "LoadBalancerNames": [
          {
            "Ref": "ComponentElasticLoadBalancer"
          },
          {
            "Ref": "InternalElasticLoadBalancer"
          }
        ],
        "MinSize": "1",
        "MaxSize": "1",
        "VPCZoneIdentifier": [
          {
            "Ref": "PrivateSubnet1Id"
          },
          {
            "Ref": "PrivateSubnet2Id"
          },
          {
            "Ref": "PrivateSubnet3Id"
          }
        ],
        "LaunchConfigurationName": {
          "Ref": "ComponentLaunchConfiguration"
        },
        "AvailabilityZones": [
          "eu-west-1a",
          "eu-west-1b",
          "eu-west-1c"
        ],
        "Tags": [
          {
            "PropagateAtLaunch": true,
            "Value": {
              "Ref": "DefaultExampleNameOfProject"
            },
            "Key": "DefaultExampleProject"
          },
          {
            "PropagateAtLaunch": true,
            "Value": {
              "Ref": "DefaultExampleApplicationName"
            },
            "Key": "DefaultExampleService"
          },
          {
            "PropagateAtLaunch": true,
            "Value": {
              "Fn::Join": [
                "",
                [
                  {
                    "Ref": "Environment"
                  },
                  {
                    "Ref": "DefaultExampleApplicationName"
                  }
                ]
              ]
            },
            "Key": "Name"
          }
        ]
      }
    },
    "DefaultExampleMasterSecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "GroupDescription": "Security group",
        "SecurityGroupIngress": [
          {
            "ToPort": "7080",
            "IpProtocol": "tcp",
            "SourceSecurityGroupId": {
              "Ref": "LoadBalancerSecurityGroup"
            },
            "FromPort": "7080"
          },
          {
            "ToPort": "7443",
            "IpProtocol": "tcp",
            "SourceSecurityGroupId": {
              "Ref": "LoadBalancerSecurityGroup"
            },
            "FromPort": "7443"
          },
          {
            "ToPort": "7080",
            "IpProtocol": "tcp",
            "SourceSecurityGroupId": {
              "Ref": "InternalLoadBalancerSecurityGroup"
            },
            "FromPort": "7080"
          },
          {
            "ToPort": "8081",
            "IpProtocol": "tcp",
            "SourceSecurityGroupId": {
              "Ref": "InternalLoadBalancerSecurityGroup"
            },
            "FromPort": "8081"
          },
          {
            "ToPort": {
              "Ref": "JenkinsJNLPSlavePort"
            },
            "IpProtocol": "tcp",
            "SourceSecurityGroupId": {
              "Ref": "InternalLoadBalancerSecurityGroup"
            },
            "FromPort": {
              "Ref": "JenkinsJNLPSlavePort"
            }
          },
          {
            "ToPort": "123",
            "IpProtocol": "udp",
            "SourceSecurityGroupId": {
              "Ref": "LoadBalancerSecurityGroup"
            },
            "FromPort": "123"
          }
        ],
        "VpcId": {
          "Ref": "VpcId"
        },
        "GroupDescription": "Component security group to allow access only from the corresponding ELB."
      }
    },
    "DefaultExampleSlaveSecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "VpcId": {
          "Ref": "VpcId"
        },
        "GroupDescription": "Security group."
      }
    },
    "Profile": {
      "Type": "AWS::IAM::InstanceProfile",
      "Properties": {
        "Path": "/",
        "Roles": [
          {
            "Ref": "Role"
          }
        ]
      }
    },
    "Role": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "ec2.amazonaws.com"
                ]
              }
            }
          ]
        }
      }
    },
    "Policy": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "Roles": [
          {
            "Ref": "Role"
          }
        ],
        "PolicyName": "Policy",
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Resource": "*",
              "Effect": "Allow"
            },
            {
              "Action": "cloudwatch:*",
              "Resource": "*",
              "Effect": "Allow"
            },
            {
              "Action": "s3:*",
              "Resource": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:s3:::",
                          {
                            "Ref": "S3Bucket"
                          }
                        ]
                      ]
                    },
                    "/*"
                  ]
                ]
              },
              "Effect": "Allow"
            },
            {
              "Action": "s3:ListBucket",
              "Resource": [
                {
                  "Fn::Join": [
                    "",
                    [
                      "arn:aws:s3:::",
                      {
                        "Ref": "S3Bucket"
                      }
                    ]
                  ]
                }
              ],
              "Effect": "Allow"
            },
            {
              "Action": "cloudformation:Describe*",
              "Resource": "*",
              "Effect": "Allow"
            },
            {
              "Action": "ec2:Describe*",
              "Resource": "*",
              "Effect": "Allow"
            },
            {
              "Action": ["logs:*"],
              "Resource": ["arn:aws:logs:*:*:*"],
              "Effect": "Allow"
            }
          ]
        }
      }
    },
    "ComponentDNS": {
      "Type": "AWS::Route53::RecordSet",
      "Properties": {
        "HostedZoneName": {
          "Ref": "DomainNameBase"
        },
        "Name": {
          "Fn::Join": [
            ".",
            [
              {
                "Ref": "Subdomain"
              },
              {
                "Ref": "DomainNameBase"
              }
            ]
          ]
        },
        "Type": "CNAME",
        "TTL": 60,
        "ResourceRecords": [
          {
            "Fn::GetAtt": [
              "ComponentElasticLoadBalancer",
              "DNSName"
            ]
          }
        ]
      }
    },
    "InternalHostname": {
      "Type": "AWS::Route53::RecordSet",
      "Properties": {
        "HostedZoneName": {
          "Ref": "DomainNameBase"
        },
        "Name": {
          "Fn::Join": [
            ".",
            [
              "internal",
              {
                "Ref": "Subdomain"
              },
              {
                "Ref": "DomainNameBase"
              }
            ]
          ]
        },
        "Type": "CNAME",
        "TTL": 60,
        "ResourceRecords": [
          {
            "Fn::GetAtt": [
              "InternalElasticLoadBalancer",
              "DNSName"
            ]
          }
        ]
      }
    },
    "LoadBalancerSecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "SecurityGroupIngress": [
          {
            "ToPort": "443",
            "IpProtocol": "tcp",
            "CidrIp": "0.0.0.0/0",
            "FromPort": "443"
          }
        ],
        "VpcId": {
          "Ref": "VpcId"
        },
        "GroupDescription": "ELB group to allow access only to and from the corresponding component."
      }
    },
    "ComponentElasticLoadBalancer": {
      "Type": "AWS::ElasticLoadBalancing::LoadBalancer",
      "Properties": {
        "Subnets": [
          {
            "Ref": "PublicSubnet1Id"
          },
          {
            "Ref": "PublicSubnet2Id"
          },
          {
            "Ref": "PublicSubnet3Id"
          }
        ],
        "Listeners": [
          {
            "InstancePort": "7443",
            "Protocol": "tcp",
            "InstanceProtocol": "tcp",
            "LoadBalancerPort": "443"
          }
        ],
        "CrossZone": false,
        "SecurityGroups": [
          {
            "Ref": "LoadBalancerSecurityGroup"
          }
        ],
        "HealthCheck": {
          "HealthyThreshold": "3",
          "Interval": "15",
          "Target": "HTTP:7080/",
          "Timeout": "10",
          "UnhealthyThreshold": "3"
        }
      }
    },
    "InternalLoadBalancerSecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "SecurityGroupIngress": [
          {
            "ToPort": "8081",
            "IpProtocol": "tcp",
            "SourceSecurityGroupId": {
              "Ref": "DefaultExampleSlaveSecurityGroup"
            },
            "FromPort": "8081"
          },
          {
            "ToPort": {
              "Ref": "JenkinsJNLPSlavePort"
            },
            "IpProtocol": "tcp",
            "SourceSecurityGroupId": {
              "Ref": "DefaultExampleSlaveSecurityGroup"
            },
            "FromPort": {
              "Ref": "JenkinsJNLPSlavePort"
            }
          }
        ],
        "VpcId": {
          "Ref": "VpcId"
        },
        "GroupDescription": "ELB group to allow access only to and from the corresponding component."
      }
    },
    "InternalElasticLoadBalancer": {
      "Type": "AWS::ElasticLoadBalancing::LoadBalancer",
      "Properties": {
        "Scheme": "internal",
        "Subnets": [
          {
            "Ref": "PrivateSubnet1Id"
          },
          {
            "Ref": "PrivateSubnet2Id"
          },
          {
            "Ref": "PrivateSubnet3Id"
          }
        ],
        "ConnectionSettings": {
          "IdleTimeout" : 3600
        },
        "Listeners": [
          {
            "InstancePort": "8081",
            "Protocol": "tcp",
            "InstanceProtocol": "tcp",
            "LoadBalancerPort": "8081"
          },
          {
            "InstancePort": {
              "Ref": "JenkinsJNLPSlavePort"
            },
            "Protocol": "tcp",
            "InstanceProtocol": "tcp",
            "LoadBalancerPort": {
              "Ref": "JenkinsJNLPSlavePort"
            }
          }
        ],
        "CrossZone": false,
        "SecurityGroups": [
          {
            "Ref": "InternalLoadBalancerSecurityGroup"
          }
        ],
        "HealthCheck": {
          "HealthyThreshold": "3",
          "Interval": "15",
          "Target": "HTTP:7080/",
          "Timeout": "10",
          "UnhealthyThreshold": "3"
        }
      }
    },
    "ComponentLaunchConfiguration": {
      "Type": "AWS::AutoScaling::LaunchConfiguration",
      "Properties": {
        "KeyName": {
          "Ref": "KeyName"
        },
        "IamInstanceProfile": {
          "Ref": "Profile"
        },
        "ImageId": {
          "Ref": "ImageId"
        },
        "EbsOptimized": false,
        "SecurityGroups": [
          {
            "Ref": "BastionSecurityGroup"
          },
          {
            "Ref": "DefaultExampleMasterSecurityGroup"
          }
        ],
        "InstanceType": {
          "Ref": "InstanceType"
        }
      }
    },
    "S3Bucket": {
      "Type": "AWS::S3::Bucket",
      "Properties": {
        "AccessControl": "BucketOwnerFullControl",
        "LifecycleConfiguration": {
          "Rules": [
            {
              "ExpirationInDays": {
                "Ref": "DefaultExampleS3BackupsExpirationInDays"
              },
              "Id": "S3BackupsExpirationRule",
              "Prefix": {
                "Fn::Join" : ["", [{ "Ref": "BackupS3Path" }, "/*"]]
              },
              "Status": "Enabled"
            }
          ]
        }
      }
    },
    "JenkinsDefaultExample": {
      "Type": "AWS::Logs::DefaultExample",
      "Properties": {
        "RetentionInDays": 14
      }
    }
  }
}
```

---

|||aws dynamo cloudformation

|||dynamo-iam-cloudformation-template-parameters-dev.json

```json
{
  "DefaultExampleComponentRole": "default-example-dev-ComponentRole-I3408UT38",
  "DefaultExampleDynamoTable": "arn:aws:dynamodb:eu-west-1:8934897589:table/default-example-dev-dynamo-1ONUW2ZVFRB5J"
}
```

|||dynamo-iam-cloudformation-template.json

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Parameters": {
    "DefaultExampleComponentRole": {
      "Default": ".",
      "Type": "String",
      "Description": "The role used by the application."
    },
    "DefaultExampleDynamoTable": {
      "Default": ".",
      "Type": "String",
      "Description": "Dynamo table used to persist results from the application."
    }
  },
  "Resources": {
    "defaultExampleDynamoPolicy": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyName" : "DefaultExampleDynamoPolicy",
        "Roles" : [
          {"Ref" : "DefaultExampleComponentRole"}
        ],
        "PolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "dynamodb:BatchGetItem",
                "dynamodb:BatchWriteItem",
                "dynamodb:GetItem",
                "dynamodb:GetRecords",
                "dynamodb:PutItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:UpdateItem"
            ],
              "Resource": {"Ref": "DefaultExampleDynamoTable"}
            }
          ]
        }
      }
    }
  }
}
```

---

|||aws dynamo cloudformation

|||dynamo-cloudformation-template-parameters-dev.json

```json
{
  "ProvisionedWrites": 9,
  "ProvisionedReads": 9
}
```

|||dynamo-cloudformation-template.json

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Parameters": {
    "ProvisionedReads": {
      "Default": "1",
      "Type": "String",
      "Description": "Provisioned reads per second on the dynamo table."
    },
    "ProvisionedWrites": {
      "Default": "1",
      "Type": "String",
      "Description": "Provisioned writes per second on the dynamo table."
    }
  },
  "Resources": {
    "defaultExampleDynamoApp": {
      "Type": "AWS::DynamoDB::Table",
      "Properties": {
        "AttributeDefinitions": [
          {
            "AttributeName": "defaultExampleAttribute1",
            "AttributeType": "N"
          },
          {
            "AttributeName": "defaultExampleAttribute2",
            "AttributeType": "N"
          }
        ],
        "KeySchema": [
          {
            "AttributeName": "defaultExampleAttribute1",
            "KeyType": "HASH"
          },
          {
            "AttributeName": "defaultExampleAttribute2",
            "KeyType": "RANGE"
          }
        ],
        "ProvisionedThroughput": {
          "WriteCapacityUnits": {"Ref": "ProvisionedWrites"},
          "ReadCapacityUnits": {"Ref": "ProvisionedReads"}
        }
      }
    }
  }
}
```

---

|||aws s3 bucket cloudformation

|||cloudformation-template-parameters-dev.json

```json
{
    "DefaultExampleBucketName": "default-example-s3-bucket",
    "DefaultExampleComponentRole": "arn:aws:iam::4356456436534564:role/default-example-dev-ComponentRole-SFRT34ERF",
    "DefaultExampleRootAccount": "arn:aws:iam::[DEFAULT-ROOT-ACCOUNT-ID]:root"
}
```

|||groups-cloudformation-template.json

```json
{
    "AWSTemplateFormatVersion" : "2010-09-09",
    "Parameters": {
        "DefaultExampleBucketName": {
            "Description": "Name of S3 bucket",
            "Type": "String",
            "Default": "arn:aws:iam::[DEFAULT-ROOT-ACCOUNT-ID]:user/default-example-s3-bucket",
        },
        "DefaultExampleComponentRole": {
            "Default": "arn:aws:iam::4356456436534564:role/default-example-dev-ComponentRole-SFRT34ERF",
            "Type": "String",
            "Description": "Default example component role ARN of service."
        },
        "DefaultExampleRootAccount": {
            "Default": "arn:aws:iam::[DEFAULT-ROOT-ACCOUNT-ID]:root",
            "Type": "String",
            "Description": "Root account ARN."
        }
    },
    "Resources": {
        "PublicBucketPolicy": {
            "Type": "AWS::S3::BucketPolicy",
            "Properties": {
                "Bucket": {
                    "Ref": "DefaultExampleBucketName"
                },
                "PolicyDocument": {
                    "Statement": [
                        {
                            "Action": [
                                "s3:ListBucket",
                                "s3:PutObject",
                                "s3:GetBucketLocation",
                                "s3:GetObject",
                                "s3:PutObjectAcl",
                                "s3:PutBucketNotification",
                                "s3:DeleteObject",
                                "s3:AbortMultipartUpload",
                                "s3:ListMultipartUploadParts",
                                "s3:ListBucketMultipartUploads"
                            ],
                            "Effect": "Allow",
                            "Resource": [
                                {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "arn:aws:s3:::",
                                            {
                                                "Ref": "DefaultExampleBucketName"
                                            },
                                            "/*"
                                        ]
                                    ]
                                },
                                {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "arn:aws:s3:::",
                                            {
                                                "Ref": "DefaultExampleBucketName"
                                            }
                                        ]
                                    ]
                                }
                            ],
                            "Principal": {
                                "AWS": [
                                    { "Ref": "DefaultExampleComponentRole" },
                                    { "Ref": "DefaultExampleRootAccount" }
                                ]
                            }
                        },
                        {
                            "Sid": "If there is a matching user agent then grant access to the s3 bucket.",
                            "Effect": "Allow",
                            "Principal": {
                                "AWS": "*"
                            },
                            "Action": "s3:GetObject",
                            "Resource": {
                                "Fn::Join": [
                                    "",
                                    [
                                        "arn:aws:s3:::",
                                        {
                                            "Ref": "DefaultExampleBucketName"
                                        },
                                        "/*"
                                    ]
                                ]
                            },
                            "Condition": {
                                "StringEquals": {
                                    "aws:UserAgent": [
                                        "27834874398732498ufy98yfdhsiufas7dfuwe9yr2983r4283487239847987fg",
                                        "dhuasiudfhiw4yu382y238u498u389u9"
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
}
```

---

|||aws users cloudformation
|||aws goups cloudformation

|||cloudformation-template-parameters-dev.json

```json
{
    "DefaultExampleUser1": "default-example-user-dev-User1-U32YRY293Y9",
    "DefaultExampleUser2": "default-example-user-dev-User2-37Y9IER09IT"
}
```

|||groups-cloudformation-template.json

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Parameters": {
    "DefaultExampleUser1": {
      "Default": ".",
      "Type": "String",
      "Description": "ARN of default example user1."
    },
    "DefaultExampleUser2": {
      "Default": ".",
      "Type": "String",
      "Description": "ARN of default example user2."
    }
  },
  "Resources": {
    "DefaultExampleGroup1": {
      "Type": "AWS::IAM::Group",
      "Properties": {
        "Policies": [
          {
            "PolicyName": "S3_Bucket_Access",
            "PolicyDocument": {
              "Statement": {
                "Effect": "Allow",
                "Action": [
                  "s3:ListBucket",
                  "s3:GetObject",
                  "s3:PutObjectAcl",
                  "s3:PutObject"
                ],
                "Resource": [
                  "arn:aws:s3:::dir1/*",
                  "arn:aws:s3:::dir1"
                ]
              }
            }
          }
        ]
      }
    },
    "addUsersToDefaultExampleGroup1": {
      "Type": "AWS::IAM::UserToGroupAddition",
      "Properties": {
        "GroupName": {
          "Ref": "DefaultExampleGroup1"
        },
        "Users": [
          {
            "Ref": "DefaultExampleUser1"
          },
          {
            "Ref": "DefaultExampleUser2"
          }
        ]
      }
    }
  }
}
```

---

|||aws users cloudformation 2
|||aws goups cloudformation 2
|||aws users and groups cloudformation 2

|||users-and-groups-cloudformation-template-parameters-dev.json

```json
{
  "DefaultExampleGroup" : "default-example-group-dev-AIIOJWEIOOU",
  "DefaultExampleSNSTopicARN" : "arn:aws:sns:eu-west-1:123213456567:default-example-notification",
  "DefaultExampleSQSQueueARN" : "arn:aws:sqs:eu-west-1:123213456567:default-example-notification"
}
```

|||users-and-groups-cloudformation-template.json

```json
{
  "Parameters": {
    "DefaultExampleGroup": {
      "Description": "Default example group.",
      "Type": "String"
    },
    "DefaultExampleSNSTopicARN": {
      "Description": "Default example topic ARN.",
      "Type": "String",
      "Default": "arn:aws:sns:eu-west-1:169163488685:int-publisher-notifications"
    }
  },
  "Resources": {
    "DefaultExampleUser": {
      "Type": "AWS::IAM::User",
      "Properties": {
        "Groups": [
          {
            "Ref": "DefaultExampleGroup"
          }
        ],
        "Policies": [
          {
            "PolicyName": "SNSAccessPolicy",
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "SNS:GetTopicAttributes",
                    "SNS:Publish"
                  ],
                  "Resource": {
                    "Ref": "DefaultExampleSNSTopicARN"
                  },
                  "Effect": "Allow"
                }
              ]
            }
          },
          {
            "PolicyName": "SQSAccessPolicy",
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "SQS:SendMessage",
                    "SQS:GetQueueAttributes"
                  ],
                  "Resource": {
                    "Ref": "DefaultExampleSQSQueueARN"
                  },
                  "Effect": "Allow"
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```

---

|||aws sqs cloudformation
|||sqs template

|||parameters-dev.json

```json
{
  "Environment": "dev",
  "DefaultExampleSNS": "arn:aws:sns:eu-west-1:123213234456678:dev-default-example-sns",
  "DefaultExampleServiceComponentRoleArn": "arn:aws:iam::234345357678998:role/default-example-app-dev-ComponentRole-SDOFPOI0980"
}
```

|||sqs-template.json

```json
{
  "AWSTemplateFormatVersion": "2014-09-09",
  "Parameters": {
    "Environment": {
      "Default": "dev",
      "Type": "String"
    },
    "DefaultExampleSNS": {
      "Description": "Default example SNS topic.",
      "Type": "String"
    },
    "DefaultExampleServiceComponentRoleArn": {
      "Type": "String",
      "Description": "The ARN of the Component role for the default service."
    }
  },
  "Description": "Default example SQS.",
  "Resources": {
    "defaultExampleSQS": {
      "Type": "AWS::SQS::Queue",
      "Properties": {
        "QueueName": {
          "Fn::Join": [
            "",
            [
              {
                "Ref": "Environment"
              },
              "-default-example-sqs-name"
            ]
          ]
        },
        "MessageRetentionPeriod": 604800
      }
    },
    "defaultExampleSQSPolicy": {
      "Type": "AWS::SQS::QueuePolicy",
      "Properties": {
        "Queues": [
          {
            "Ref": "defaultExampleSQS"
          }
        ],
        "PolicyDocument": {
          "Id": "defaultExampleSQSPolicy",
          "Statement": [
            {
              "Resource": "*",
              "Effect": "Allow",
              "Sid": "Allow-sns-to-publish-to-sqs",
              "Action": [
                "SQS:SendMessage"
              ],
              "Condition": {
                "ArnEquals": {
                  "aws:SourceArn": [
                    {
                      "Ref": "DefaultExampleSNS"
                    }
                  ]
                }
              },
              "Principal": {
                "AWS": "*"
              }
            },
              {
                "Sid": "Give-full-control-to-Default-Example-Service-Application",
                "Effect": "Allow",
                "Principal": { "AWS": { "Ref": "DefaultExampleServiceComponentRoleArn" } },
                "Action": "SQS:*",
                "Resource": { "Fn::GetAtt" : ["defaultExampleSQS", "Arn"]}
              }
          ]
        }
      }
    }
  }
}
```

---

|||aws sns cloudformation
|||sns template

|||parameters-dev.json

```json
{
  "Environment": "dev"
}
```

|||sns-template.json

```json
{
  "AWSTemplateFormatVersion":"2014-09-09",
  "Parameters":{
    "Environment":{
      "Default":"dev",
      "Type":"String"
    }
  },
  "Description":"Default example SNS topic.",
  "Resources":{
    "DefaultExampleSNSTopic": {
      "Type" : "AWS::SNS::Topic",
      "Properties" : {
        "DisplayName" : "Default example SNS topic.",
        "Subscription" : [],
        "TopicName" : {
          "Fn::Join":[
            "",
            [
              {
                "Ref":"Environment"
              },
              "-default-example-sns-topic-name"
            ]
          ]
        }
      }
    }
  }
}
```

---

|||aws route53
|||route53 template

|||parameters-dev.json

```json
{
  "Service_DNS_URL": "default-example-service.dev.23werqw3423432.xhst.com",
  "HostedZoneName": "service-api.com.",
  "Environment": "dev",
  "ServiceName": "default-example-service"
}
```

|||aws-route53-alarms-demplate.json

```json
{
  "AWSTemplateFormatVersion": "2014-09-09",
  "Resources": {
    "RecordSetGroup": {
      "Type": "AWS::Route53::RecordSetGroup",
      "Properties": {
        "HostedZoneName": {
          "Ref": "HostedZoneName"
        },
        "RecordSets": [
          {
            "TTL": "3600",
            "Type": "CNAME",
            "Name": {
              "Fn::Join": [
                "",
                [
                  {
                    "Ref": "ServiceName"
                  },
                  ".",
                  {
                    "Ref": "Environment"
                  },
                  ".",
                  {
                    "Ref": "HostedZoneName"
                  }
                ]
              ]
            },
            "ResourceRecords": [
              {
                "Ref": "Service_DNS_URL"
              }
            ]
          }
        ]
      }
    }
  },
  "Parameters": {
    "ServiceName": {
      "Type": "String",
      "Description": "The service name."
    },
    "Environment": {
      "AllowedPattern": "\\.(?:(?!production\\.)\\w+\\.)?",
      "Default": ".",
      "Type": "String",
      "Description": "Environment abbreviation."
    },
    "Service_DNS_URL": {
      "Type": "String",
      "Description": "Service_DNS_URL hostname for the service (e.g. '[serviceName].[env].account-identifier.xhst.com')."
    },
    "HostedZoneName": {
      "AllowedPattern": ".*\\.",
      "Type": "String",
      "Description": "Domain to use with trailing dot (e.g. 'service-api.com.')."
    }
  }
}
```

---

|||aws lambda function alarm
|||lambda template

|||parameters-dev.json

```json
{
    "AlarmSNSTopicArn": "arn:aws:sns:eu-west-1:2343523453456:alarm-topic",
    "DefaultExampleLambdaFunctionName": "lambda-function-name-dev-LambdaFunction-Q12EWE3423"
}
```

|||lambda-alarms-template.json

```json
{
  "AWSTemplateFormatVersion": "2014-09-09",
  "Parameters": {
    "AlarmSNSTopicArn": {
      "Type": "String"
    },
    "DefaultExampleLambdaFunctionName": {
      "Type": "String"
    }
  },
  "Description": "Default example Lambda function - alarms.",
  "Resources": {
    "DefaultExampleLambdaErrorsAlarm": {
      "Type": "AWS::CloudWatch::Alarm",
      "Properties": {
        "EvaluationPeriods": 1,
        "Dimensions": [
          {
            "Name": "FunctionName",
            "Value": {
              "Ref": "DefaultExampleLambdaFunctionName"
            }
          }
        ],
        "AlarmActions": [
          {
            "Ref": "AlarmSNSTopicArn"
          }
        ],
        "OKActions": [
          {
            "Ref": "AlarmSNSTopicArn"
          }
        ],
        "AlarmDescription": {
          "Fn::Join": [
            "",
            [
              "severity=serious"
            ]
          ]
        },
        "Namespace": "AWS/Lambda",
        "Period": 60,
        "ComparisonOperator": "GreaterThanOrEqualToThreshold",
        "Statistic": "Sum",
        "Threshold": 10,
        "MetricName": "Errors",
        "Unit": "Count"
      }
    }
  }
}
```

---

|||aws lambda functions
|||lambda aws template
|||cloudformation sqs
|||cloudformation sns

|||parameters-dev.json

```json
{
  "SQSQueue1": "arn:aws:sqs:eu-west-1:456756746575:name-of-queue",
  "SNSTopic1": "arn:aws:sns:eu-west-1:345456345645:name-of-topic",
  "Environment": "dev"
}
```

|||lambda-template-1.json

```json
{
  "AWSTemplateFormatVersion":"2014-09-09",
  "Parameters":{
    "Environment":{
      "Default":"dev",
      "Type":"String"
    },
    "SQSQueue1":{
      "Type":"String"
    },
    "SNSTopic1":{
      "Type":"String"
    }
  },
  "Description":"Default Example Lambda",
  "Resources":{
    "DefaultExampleLambdaRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "Path": "/",
        "AssumeRolePolicyDocument": {
          "Version": "2014-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "lambda.amazonaws.com"
                ]
              },
              "Action": [
                "sts:AssumeRole"
              ]
            }
          ]
        }
      }
    },
    "DefaultExampleLambdaPolicy": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyName": "DefaultExampleLambdaPolicy",
        "PolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Action": ["SQS:ReceiveMessage", "SQS:SendMessage", "SQS:DeleteMessage"],
              "Resource": [
                {
                  "Ref": "SQSQueue1"
                }
              ]
            },
            {
              "Effect": "Allow",
              "Action": "SNS:Publish",
              "Resource": [
                {
                  "Ref": "SNSTopic1"
                }
              ]
            },
            {
              "Effect": "Allow",
              "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
              ],
              "Resource": "arn:aws:logs:*:*:*"
            }
          ]
        },
        "Roles": [
          {
            "Ref": "DefaultExampleLambdaRole"
          }
        ]
      }
    },
    "DefaultExampleLambdaFunction": {
      "Type" : "AWS::Lambda::Function",
      "Properties" : {
        "Code" : {
          "ZipFile": "exports.handler = function (event, context, callback) {callback(null, 'Function not deployed, please deploy.'); };"
        },
        "Description" : "Default Example Lambda",
        "Handler" : "index.handler",
        "MemorySize" : 128,
        "Role" : {
          "Fn::GetAtt" : [
            "DefaultExampleLambdaRole", "Arn"
          ]
        },
        "Runtime" : "nodejs4.3",
        "Timeout" : 10
      }
    }
  }
}
```

---

|||parameters-dev.json

```json
{
    "NameOfApplication": "name-of-application",
    "AlarmTopicArn": "arn:aws:sns:eu-west-1:2323452345:example-alarm-sns-arn",
    "Environment": "int",
    "DocumentationURL": "http://some.default.example.com/documentation",
    "DefaultExampleSQS": "default-example-sqs-name",
    "AutoScalingGroupName": "default-example-ComponentAutoScalingGroup-2YEDIUHWYE9"
}
```

|||alarm-template-1.json

```json
{
    "AWSTemplateFormatVersion": "2010-10-10",
    "Parameters": {
        "NameOfApplication": {
            "Default": "name-of-application",
            "Type": "String"
        },
        "AlarmTopicArn": {
            "Type": "String"
        },
        "Environment": {
            "Type": "String"
        },
        "DocumentationURL": {
            "Type": "String"
        },
        "DefaultExampleSQS": {
            "Type": "String"
        },
        "AutoScalingGroupName": {
            "Default": "default-example-ComponentAutoScalingGroup-2YEDIUHWYE9",
            "Type": "String"
        }
    },
    "Description": Default example cloudwatch cloudformation alarms template",
    "Resources": {
        "DefaultAlarm1": {
            "Type": "AWS::CloudWatch::Alarm",
            "Properties": {
                "EvaluationPeriods": 1,
                "Dimensions": [
                    {
                        "Name": "Environment",
                        "Value": {
                            "Ref": "Environment"
                        }
                    }
                ],
                "AlarmActions": [
                    {
                        "Ref": "AlarmTopicArn"
                    }
                ],
                "OKActions": [
                    {
                        "Ref": "AlarmTopicArn"
                    }
                ],
                "AlarmDescription": {
                    "Fn::Join": [
                        "",
                        [
                            "severity=critical,documentation:",
                            {
                                "Ref": "DocumentationURL"
                            }
                        ]
                    ]
                },
                "Namespace": "Default/example/namespace",
                "Period": 60,
                "ComparisonOperator": "GreaterThanThreshold",
                "Statistic": "Sum",
                "Threshold": 1.66,
                "MetricName": "default-example-metric-name1",
                "Unit":"Count"

            }
        },
        "DefaultAlarm3": {
            "Type": "AWS::CloudWatch::Alarm",
            "Properties": {
                "EvaluationPeriods": 2,
                "Dimensions": [
                    {
                        "Name": "QueueName",
                        "Value": {
                            "Ref": "DefaultExampleSQS"
                        }
                    }
                ],
                "AlarmActions": [
                    {
                        "Ref": "AlarmTopicArn"
                    }
                ],
                "OKActions": [
                ],
                "AlarmDescription":{
                    "Fn::Join":[
                        "",
                        [
                            "severity=critical,documentation:",
                            {
                                "Ref":"DocumentationURL"
                            }
                        ]
                    ]
                },
                "Namespace": "AWS/SQS",
                "Period": 300,
                "ComparisonOperator": "GreaterThanThreshold",
                "Statistic": "Average",
                "Threshold": 50,
                "MetricName": "ApproximateNumberOfMessagesVisible"
            }
        },
        "CPULoadAlarm": {
            "Type": "AWS::CloudWatch::Alarm",
            "Properties": {
                "EvaluationPeriods": 1,
                "Dimensions": [
                    {
                        "Name": "AutoScalingGroupName",
                        "Value": {
                            "Ref": "AutoScalingGroupName"
                        }
                    }
                ],
                "AlarmActions": [
                    {
                        "Ref": "AlarmTopicArn"
                    }
                ],
                "OKActions": [
                    {
                        "Ref": "AlarmTopicArn"
                    }
                ],
                "AlarmDescription": {
                    "Fn::Join": [
                        "",
                        [
                            "severity=critical,documentation:",
                            {
                                "Ref": "DocumentationURL"
                            }
                        ]
                    ]
                },
                "Namespace": "AWS/EC2",
                "Period": 60,
                "ComparisonOperator": "GreaterThanThreshold",
                "Statistic": "Maximum",
                "Threshold": 60,
                "MetricName": "CPUUtilization"
            }
        },
        "StatusCheckFailedInstanceAlarm": {
            "Type": "AWS::CloudWatch::Alarm",
            "Properties": {
                "EvaluationPeriods": 1,
                "Dimensions": [
                    {
                        "Name": "AutoScalingGroupName",
                        "Value": {
                            "Ref": "AutoScalingGroupName"
                        }
                    }
                ],
                "AlarmActions": [
                    {
                        "Ref": "AlarmTopicArn"
                    }
                ],
                "OKActions": [
                    {
                        "Ref": "AlarmTopicArn"
                    }
                ],
                "AlarmDescription": {
                    "Fn::Join": [
                        "",
                        [
                            "severity=critical,documentation:",
                            {
                                "Ref": "DocumentationURL"
                            }
                        ]
                    ]
                },
                "Namespace": "AWS/EC2",
                "Period": 300,
                "ComparisonOperator": "GreaterThanThreshold",
                "Statistic": "Maximum",
                "Threshold": 5,
                "MetricName": "StatusCheckFailed_Instance"
            }
        },
        "StatusCheckFailedSystemAlarm": {
            "Type": "AWS::CloudWatch::Alarm",
            "Properties": {
                "EvaluationPeriods": 1,
                "Dimensions": [
                    {
                        "Name": "AutoScalingGroupName",
                        "Value": {
                            "Ref": "AutoScalingGroupName"
                        }
                    }
                ],
                "AlarmActions": [
                    {
                        "Ref": "AlarmTopicArn"
                    }
                ],
                "OKActions": [
                    {
                        "Ref": "AlarmTopicArn"
                    }
                ],
                "AlarmDescription": {
                    "Fn::Join": [
                        "",
                        [
                            "severity=critical,documentation:",
                            {
                                "Ref": "DocumentationURL"
                            }
                        ]
                    ]
                },
                "Namespace": "AWS/EC2",
                "Period": 300,
                "ComparisonOperator": "GreaterThanThreshold",
                "Statistic": "Maximum",
                "Threshold": 5,
                "MetricName": "StatusCheckFailed_System"
            }
        }
    }
}
```

---

|||parameters-dev.json

```json
{
  DomainNameBase": "default.domain.base.com",
  CnameEntry": "ExampleNameOfProject",
  MinSize": "0",
  MaxSize": "1",
  DefaultPauseTime": "PT0M",
  DefaultUpdateMinInstancesInService": "0",
  DefaultMaxBatchSize": "1",
  DefaultEnvironment": "dev",
  KeyName": "defaultKeyName",
  InstanceType": "t3.medium",
  S3BucketARN": "arn:aws:s3:::default-s3-bucket",
  SNSTopicARN": "arn:aws:sns:eu-west-1:01234567891011:int-default-sns",
  VpcId": "ExampleVPCId-13ewe23423",
  DefaultBastionAccessSecureGroup": "exampleDefaultBastionAccessSecureGroup-saj3euhiu3e",
  DefaultPrivateSubnet1Identity": "ExampleDefaultPrivateSubnet1Identity-23ue9889",
  DefaultPrivateSubnet2Identity": "ExampleDefaultPrivateSubnet2Identity-12uur8uo",
  DefaultPublicSubnet1Identity": "ExampleDefaultPublicSubnet1Identity-123jhe23r9",
  DefaultPublicSubnet2Identity": "ExampleDefaultPublicSubnet2Identity-q3eioueroo"
}
```

|||application-template-1.json

```json
{
  "AWSTemplateFormatVersion": "2010-10-10",
  "Resources": {
    "LoadBalancerSecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "SecurityGroupIngress": [
          {
            "ToPort": "443",
            "IpProtocol": "tcp",
            "CidrIp": "0.0.0.0/0",
            "FromPort": "443"
          }
        ],
        "VpcId": {
          "Ref": "VpcId"
        },
        "GroupDescription": "An ELB group to allow access only to and from the corresponding component."
      }
    },
    "ComponentAutoScalingGroup": {
      "Type": "AWS::AutoScaling::AutoScalingGroup",
      "UpdatePolicy": {
        "AutoScalingRollingUpdate": {
          "PauseTime": {
            "Ref": "DefaultPauseTime"
          },
          "MaxBatchSize": {
            "Ref": "DefaultMaxBatchSize"
          },
          "MinInstancesInService": {
            "Ref": "DefaultUpdateMinInstancesInService"
          }
        }
      },
      "Properties": {
        "HealthCheckGracePeriod": 90,
        "Tags": [
          {
            "PropagateAtLaunch": true,
            "Value": "EXAMPLE-TAG-NAME",
            "Key": "EXAMPLE-KEY"
          },
          {
            "PropagateAtLaunch": true,
            "Value": {
              "Ref": "DefaultEnvironment"
            },
            "Key": "EXAMPLE-ENVIRONMENT-KEY"
          },
          {
            "PropagateAtLaunch": true,
            "Value": {
              "Fn::Join": [
                "",
                [
                  {
                    "Ref": "DefaultEnvironment"
                  },
                  "NAME-OF-PROJECT"
                ]
              ]
            },
            "Key": "Name"
          },
          {
            "PropagateAtLaunch": true,
            "Value": "NAME-OF-PROJECT",
            "Key": "EXAMPLE-KEY"
          }
        ],
        "LoadBalancerNames": [
          {
            "Ref": "ComponentElasticLoadBalancer"
          }
        ],
        "MinSize": {
          "Ref": "MinSize"
        },
        "MaxSize": {
          "Ref": "MaxSize"
        },
        "VPCZoneIdentifier": [
          {
            "Ref": "DefaultPrivateSubnet1Identity"
          },
          {
            "Ref": "DefaultPrivateSubnet2Identity"
          },
          {
            "Ref": "DefaultPrivateSubnet3Identity"
          }
        ],
        "LaunchConfigurationName": {
          "Ref": "ComponentLaunchConfiguration"
        },
        "AvailabilityZones": [
          "eu-west-1a",
          "eu-west-1b",
          "eu-west-1c"
        ],
        "HealthCheckType": "ELB"
      }
    },
    "ComponentElasticLoadBalancer": {
      "Type": "AWS::ElasticLoadBalancing::LoadBalancer",
      "Properties": {
        "ConnectionDrainingPolicy": {
          "Enabled": "true",
          "Timeout": "30"
        },
        "Subnets": [
          {
            "Ref": "DefaultPublicSubnet1Identity"
          },
          {
            "Ref": "DefaultPublicSubnet2Identity"
          },
          {
            "Ref": "DefaultPublicSubnet3Identity"
          }
        ],
        "HealthCheck": {
          "HealthyThreshold": "3",
          "Interval": "15",
          "Target": "HTTP:7080/status",
          "Timeout": "10",
          "UnhealthyThreshold": "3"
        },
        "Listeners": [
          {
            "InstancePort": "7443",
            "LoadBalancerPort": "443",
            "Protocol": "tcp",
            "InstanceProtocol": "tcp"
          }
        ],
        "CrossZone": true,
        "SecurityGroups": [
          {
            "Ref": "LoadBalancerSecurityGroup"
          }
        ]
      }
    },
    "ComponentLaunchConfiguration": {
      "Type": "AWS::AutoScaling::LaunchConfiguration",
      "Properties": {
        "ImageId": {
          "Ref": "ImageId"
        },
        "KeyName": {
          "Ref": "KeyName"
        },
        "EbsOptimized": false,
        "SecurityGroups": [
          {
            "Ref": "DefaultBastionAccessSecureGroup"
          },
          {
            "Ref": "ComponentSecurityGroup"
          }
        ],
        "IamInstanceProfile": {
          "Ref": "ComponentInstanceProfile"
        },
        "InstanceType": {
          "Ref": "InstanceType"
        }
      }
    },
    "ComponentInstanceProfile": {
      "Type": "AWS::IAM::InstanceProfile",
      "Properties": {
        "Path": "/",
        "Roles": [
          {
            "Ref": "ComponentRole"
          }
        ]
      }
    },
    "ComponentDNS": {
      "Type": "AWS::Route53::RecordSet",
      "Properties": {
        "HostedZoneName": {
          "Ref": "DomainNameBase"
        },
        "TTL": "60",
        "Type": "CNAME",
        "ResourceRecords": [
          {
            "Fn::GetAtt": [
              "ComponentElasticLoadBalancer",
              "DNSName"
            ]
          }
        ],
        "Name": {
          "Fn::Join": [
            ".",
            [
              {
                "Ref": "CnameEntry"
              }
            ]
          ]
        }
      }
    },
    "ComponentScalingPolicy": {
      "Type": "AWS::AutoScaling::ScalingPolicy",
      "Properties": {
        "ScalingAdjustment": 1,
        "AutoScalingGroupName": {
          "Ref": "ComponentAutoScalingGroup"
        },
        "AdjustmentType": "ChangeInCapacity"
      }
    },
    "ComponentSecurityGroup": {
      "Type": "AWS::EC2::SecurityGroup",
      "Properties": {
        "SecurityGroupIngress": [
          {
            "ToPort": "7080",
            "IpProtocol": "tcp",
            "SourceSecurityGroupId": {
              "Ref": "LoadBalancerSecurityGroup"
            },
            "FromPort": "7080"
          },
          {
            "ToPort": "7443",
            "IpProtocol": "tcp",
            "SourceSecurityGroupId": {
              "Ref": "LoadBalancerSecurityGroup"
            },
            "FromPort": "7443"
          },
          {
            "ToPort": "123",
            "IpProtocol": "udp",
            "SourceSecurityGroupId": {
              "Ref": "LoadBalancerSecurityGroup"
            },
            "FromPort": "123"
          }
        ],
        "VpcId": {
          "Ref": "VpcId"
        },
        "GroupDescription": "Component security group which allows access only from the corresponding ELB."
      }
    },
    "ComponentPolicy": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyName": "ComponentPolicy",
        "PolicyDocument": {
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Resource": [
                "*"
              ],
              "Effect": "Allow"
            },
            {
              "Action": [
                "cloudwatch:*"
              ],
              "Resource": [
                "*"
              ],
              "Effect": "Allow"
            },
            {
              "Action": [
                "cloudformation:Describe*"
              ],
              "Resource": [
                "*"
              ],
              "Effect": "Allow"
            },
            {
              "Action": [
                "ec2:Describe*"
              ],
              "Resource": [
                "*"
              ],
              "Effect": "Allow"
            },
            {
              "Action": [
                "sns:Publish"
              ],
              "Resource": [
                {
                  "Ref": "SNSTopicARN"
                }
              ],
              "Effect": "Allow"
            },
            {
              "Action": [
                "s3:Get*",
                "s3:List*",
                "s3:Put*",
                "s3:Post*"
              ],
              "Resource": [
                {
                  "Ref": "S3Bucket"
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Ref": "S3Bucket"
                      },
                      "/defaultexampleservicenamepath/*"
                    ]
                  ]
                }
              ],
              "Effect": "Allow"
            }
          ]
        },
        "Roles": [
          {
            "Ref": "ComponentRole"
          }
        ]
      }
    },
    "ComponentRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "Path": "/",
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": [
                "sts:AssumeRole"
              ],
              "Effect": "Allow",
              "Principal": {
                "Service": [
                  "ec2.amazonaws.com"
                ]
              }
            }
          ]
        }
      }
    }
  },
  "Description": "default-example-application-name cardinal application pile",
  "Parameters": {
    "DomainNameBase": {
      "Default": "default.example.domain.com.",
      "Type": "String",
      "Description": "Base domain name for adding DNS entries."
    },
    "S3Bucket": {
      "Type": "String",
      "Description": "S3 bucket ARN."
    },
    "VpcId": {
      "Type": "String",
      "Description": "VPC id."
    },
    "CnameEntry": {
      "Type": "String",
      "Description": "Cname."
    },
    "DefaultPauseTime": {
      "Default": "PT3M",
      "Type": "String",
      "Description": "Pause time between new instances coming up and the next batch being torn down during the AutoScalingGroup update."
    },
    "DefaultMaxBatchSize": {
      "Default": "1",
      "Type": "String",
      "Description": "The max number of instances to be destroyed at one time during the AutoScalingGroup update."
    },
    "DefaultUpdateMinInstancesInService": {
      "Default": "0",
      "Type": "String",
      "Description": "The min number of instances in service during the AutoScalingGroup update."
    },
    "ImageId": {
      "Type": "String",
      "Description": "The AMI image to use for this service."
    },
    "MinSize": {
      "Default": "2",
      "Type": "String",
      "Description": "The mini number of running instances."
    },
    "MaxSize": {
      "Default": "2",
      "Type": "String",
      "Description": "The max number of running instances."
    },
    "InstanceType": {
      "Default": "t2.small",
      "Type": "String",
      "Description": "Size of the EC2 instance."
    },
    "DefaultEnvironment": {
      "Type": "String",
      "Description": "Environments: Int, Test, Stage or Live"
    },
    "SNSTopicARN": {
      "Description": "Default SNS ARN.",
      "Type": "String"
    },
    "KeyName": {
      "Type": "String",
      "Description": "Name of existing EC2 keypair to enable SSH access to the newly created instances."
    },
    "DefaultBastionAccessSecureGroup": {
      "Type": "String",
      "Description": "Security group which grants access from the bastions."
    },
    "DefaultPublicSubnet1Identity": {
      "Type": "String",
      "Description": "The identity of public subnet 1."
    },
    "DefaultPublicSubnet2Identity": {
      "Type": "String",
      "Description": "The identity of public subnet 2."
    },
    "DefaultPublicSubnet3Identity": {
      "Type": "String",
      "Description": "The identity of public subnet 3."
    },
    "DefaultPrivateSubnet1Identity": {
      "Type": "String",
      "Description": "The identity of private subnet 1."
    },
    "DefaultPrivateSubnet2Identity": {
      "Type": "String",
      "Description": "The identity of private subnet 2."
    },
    "DefaultPrivateSubnet3Identity": {
      "Type": "String",
      "Description": "The identity of private subnet 3."
    }
  }
}
```

---
