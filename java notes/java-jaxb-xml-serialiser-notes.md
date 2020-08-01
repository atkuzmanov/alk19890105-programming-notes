# java jaxb xml serialiser notes

```java
|||jaxbxmlserialiser
|||jaxb xml serialiser
|||java xml serialiser
|||xml serialiser


import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMResult;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class BaseJaxbXmlSerialiser {

	private final Transformer jaxbXMLTransformer;

	private final XPathExpression defaultUnescapeNodesXPathExpression;

	
	private static final Logger LOG = LoggerFactory.getLogger(BaseJaxbXmlSerialiser.class);

	private static final String DEFAULT_NODE_XPATHS_TO_UNESCAPE_PATTERN = "//node1|//node2";

	private static final JAXBContext defaultJaxbContext = initJAXBContext();	

    private static JAXBContext initJAXBContext() {
    	try {
			List<Class<? extends Object>> classes = defaultGetJAXBClassesMethod();
			return JAXBContext.newInstance(classes.toArray(new Class[0]));
    	} catch (Exception e) {
    		LOG.error("Error while initialising JAXBContext: " + e.getMessage(), e);
    		return null;
    	}
    }
	
	public JaxbXmlSerialiser() throws JAXBException, ClassNotFoundException, ParserConfigurationException, XPathExpressionException, TransformerConfigurationException  {
		if (defaultJaxbContext == null) {
			throw new IllegalStateException("JAXBContext is null.");
		}
		jaxbXMLTransformer = createDefaultTransformer();
		defaultUnescapeNodesXPathExpression = createDefaultUnescapeNodesXPathExpression();
	}

	public String serialise(Object object) throws Exception {
		try {
			Marshaller defaultMarshaller = defaultJaxbContext.createMarshaller();
			DOMResult defaultDomResult = new DOMResult();
			defaultMarshaller.marshal(object, defaultDomResult);

			Document documentToSerialise = (Document) defaultDomResult.getNode();
			
			defaultUnescapeNodeContentsMethod(documentToSerialise);
			
			return baseSerialiseXmlAsStringMethod(documentToSerialise);
		} catch (Exception e) {
			throw new Exception("Error when serialising XML document to String.", e);
		}
	}

	private String baseSerialiseXmlAsStringMethod(Document documentToSerialise) throws TransformerException {
		StringWriter stringWriterForSerialisedDocument = new StringWriter();
		StreamResult streamResult = new StreamResult(stringWriter);
		DOMSource domSource = new DOMSource(documentToSerialise);
		jaxbXMLTransformer.transform(domSource, streamResult);
		return stringWriterForSerialisedDocument.toString();		
	}

	private Transformer createDefaultTransformer() throws TransformerFactoryConfigurationError, TransformerConfigurationException{
		Transformer xmlToStringtransformer = TransformerFactory.newInstance().newTransformer();
	    xmlToStringtransformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
		xmlToStringtransformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
	    xmlToStringtransformer.setOutputProperty(OutputKeys.INDENT, "yes");
	    xmlToStringtransformer.setOutputProperty(OutputKeys.METHOD, "xml");

		return xmlToStringtransformer;
	}

	private XPathExpression createDefaultUnescapeNodesXPathExpression() throws XPathExpressionException {
		XPathFactory xpathFactory = XPathFactory.newInstance();
		XPath unescapeNodesXPath = xpathFactory.newXPath();
		return unescapeNodesXPath.compile(DEFAULT_NODE_XPATHS_TO_UNESCAPE_PATTERN);
	}

	private void defaultUnescapeNodeContentsMethod(Document documentWithNodeToUnescape) throws SAXException, IOException, ParserConfigurationException, XPathExpressionException {
		NodeList nodeListWithEscapedXml = (NodeList) defaultUnescapeNodesXPathExpression.evaluate(documentWithNodeToUnescape, XPathConstants.NODESET);
		DocumentBuilder documentBuilder = createDefaultDocumentBuilder();
		
		if (nodeListWithEscapedXml != null) {
			for (int i = 0; i < nodeListWithEscapedXml.getLength(); i++) {
				Node nodeWithEscapedXml = nodeListWithEscapedXml.item(i);
				String escapedXmlFromNode = nodeWithEscapedXml.getTextContent();
				Node unescapedXmlRootNode = documentBuilder.parse(new InputSource(new StringReader(escapedXmlFromNode)));
				Node importedNodeUnescaped = documentWithNodeToUnescape.importNode(unescapedXmlRootNode.getFirstChild(), true);
				nodeWithEscapedXml.getParentNode().replaceChild(importedNodeUnescaped, nodeWithEscapedXml);
			}
		}
	}
	
	private static List<Class<? extends Object>> defaultGetJAXBClassesMethod() throws ClassNotFoundException {
		ClassPathScanningCandidateComponentProvider classPtathScanner = new ClassPathScanningCandidateComponentProvider(false);
		classPtathScanner.addIncludeFilter(new AnnotationTypeFilter(XmlRootElement.class));

		List<Class<? extends Object>> classesFound = new ArrayList<Class<? extends Object>>();
		for (BeanDefinition defaultBeanDefinition : classPtathScanner.findCandidateComponents("package.path.to.project")) {
			String foundBeanClassName = defaultBeanDefinition.getBeanClassName();
			LOG.debug("Found annotated class: " + foundBeanClassName);
		    classesFound.add(Class.forName(foundBeanClassName));
		}
		return classesFound;
	}

	private DocumentBuilder createDefaultDocumentBuilder() throws ParserConfigurationException {
		DocumentBuilderFactory docBuilderfactory;
		docBuilderfactory = DocumentBuilderFactory.newInstance();
	    docBuilderfactory.setNamespaceAware(true);
	    return docBuilderfactory.newDocumentBuilder();
	}
}

//---

import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;
import java.util.ArrayList;
import java.util.List;
//  Methods for fast retrieval of data from a raw xml string.
//  Prevent from instantiating full content object, which is be expensive, if we just want to get a small piece from it.
public static Element getDefaultRootElement(String xmlContentAsString) throws Exception {
    try {
        return DocumentHelper.parseText(xmlContentAsString).getRootElement();
    } catch (DocumentException e) {
        throw new Exception("Exception while parsing XML content: " + e.getMessage(), e);
    }
}
public static String fastGetXMLTagWithProperty(String xmlContentAsString, String xmlPropertyString) throws Exception {
    String xmlString = defaultRemoveNamespaces(xmlContentAsString);
    Element extractedRootElement = XmlHelper.getDefaultRootElement(xmlString);
    Node resultNode = extractedRootElement.selectSingleNode("//exampleXMLTag/" + xmlPropertyString);
    return (resultNode != null) ? resultNode.getText() : "";
}
public static String defaultRemoveNamespaces(String xmlContentAsString) {
    String removedNamsepaces = xmlContentAsString.replaceAll("xmlns=\"http://www.example.com/namespace1\"", "");
    removedNamsepaces = removedNamsepaces.replaceAll("xmlns=\"http://www.example.com/namespace2\"", "");
    return removedNamsepaces;
}


/*--------------------------------*/

|||version service
|||java version service


import com.google.common.base.Optional;
import com.google.common.base.Predicate;

import org.apache.maven.artifact.versioning.DefaultArtifactVersion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.regex.Pattern;


public class ExampleVersionService {
	
	private static final Pattern DEFAULT_VERSION_THREE_NUMBER_PATTERN = Pattern.compile("^(?:(\\d+)\\.)?(?:(\\d+)\\.)?(\\d+)$");
	private static final int MIN_SUPPORTED = 0
	private static final int MAX_SUPPORTED = 10
	
	private DefaultArtifactVersion minimumVersion;
	private DefaultArtifactVersion maximumVersion;
	
	public ExampleVersionService(String minimumVersion, String maximumVersion) {		
		this.minimumVersion = new DefaultArtifactVersion(minimumVersion);
		this.maximumVersion = new DefaultArtifactVersion(maximumVersion);
	}

	public void isVersionValid(String wantedVersion) throws Exception {
		ExamplePatternMatchingPredicateImpl versionNumberPredicate = new ExamplePatternMatchingPredicateImpl(DEFAULT_VERSION_THREE_NUMBER_PATTERN);
		
		if(!versionNumberPredicate.apply(wantedVersion))
				throw new Exception("The wanted version is invalid, version numbers should match the three number pattern Major.Minor.Patch");
	}

	private void isReady() {
		if(!Optional.fromNullable(minimumVersion).isPresent() && !Optional.fromNullable(maximumVersion).isPresent()) {
			throw new IllegalArgumentException("ExampleVersionService has not been initialised with minimumVersion and maximumVersion.");
		} 
	}

	public Boolean isSupported(String wantedVersion) throws Exception {
		isReady();
		
		DefaultArtifactVersion defaultArtifactVersion = new DefaultArtifactVersion(wantedVersion);
		if (defaultArtifactVersion.compareTo(minimumVersion) == -1 || defaultArtifactVersion.compareTo(maximumVersion) == 1) {
			throw new Exception("The version number " + defaultArtifactVersion + " is not supported, supported versions are " + minimumVersion + " and " + maximumVersion);
		} else {
			return Boolean.TRUE;
		}	
	}
	
	public Boolean isDeprecated(String wantedVersion) {
		isReady();
		
		DefaultArtifactVersion defaultArtifactVersion = new DefaultArtifactVersion(wantedVersion);
		return (defaultArtifactVersion.compareTo(maximumVersion) == -1) ? Boolean.TRUE : Boolean.FALSE;
	}
	
	private static class ExamplePatternMatchingPredicateImpl implements Predicate<String> {
        private Pattern patternToMatch;

        private ExamplePatternMatchingPredicateImpl(Pattern pattern) {
            this.patternToMatch = patternToMatch;
        }

        public boolean apply(String inputToTest) {
            return patternToMatch.matcher(inputToTest).matches();
        }
    }
}


/*--------------------------------*/


|||recursive tree flattening
|||java recursive

public class TreeNode {
	public List<TreeNode> listOfSubNodes = new ArrayList<TreeNode>();
	public List<SpecialNode> listOfSpecialNodes = new ArrayList<SpecialNode>();
}


private List<TreeNode> flattenTreeNodes(List<TreeNode> treeNodes) {
	List<TreeNode> flattenedTreeNodes = new ArrayList<TreeNode>();
	if (treeNodes == null) {
		return flattenedTreeNodes;
	}
	
	for (TreeNode node : treeNodes) {
		List<TreeNode> subNodes = node.listOfSubNodes;
		if (subNodes.isEmpty()) { // This is a leaf node and has no sub nodes.
			node.addSpecialNodes(getSpecialNodes(node));
			node.setListOfSubNodes(new ArrayList<TreeNode>());
			flattenedTreeNodes.add(node);
		} else {
			flattenedTreeNodes.addAll(flattenTreeNodes(subNodes));
		}
	}
	
	return groupsToKeep;
}

private List<SpecialNode> getSpecialNodes(TreeNode treeNode) {
	List<SpecialNode> specialNodesToReturn = new ArrayList<SpecialNode>();
	List<SpecialNode> specialNodes = treeNode.listOfSpecialNodes;
	if (specialNodes != null) {
		specialNodesToReturn.addAll(specialNodes);
	}
	specialNodesToReturn.addAll(getSpecialNodesFromSubNodes(treeNode.listOfSubNodes));

	return specialNodesToReturn;
}

private List<SpecialNode> getSpecialNodesFromSubNodes(List<TreeNode> treeNodes) {
	List<SpecialNode> extractedSpecialNodes = new ArrayList<SpecialNode>();
	if (treeNodes == null) {
		return extractedSpecialNodes;
	}
	
	for (TreeNode node : treeNodes) {
		extractedSpecialNodes.addAll(node.listOfSpecialNodes);
		extractedSpecialNodes.addAll(getSpecialNodesFromSubNodes(node.listOfSubNodes);
	}
	
	return extractedSpecialNodes;
}




/*--------------------------------*/



|||java xml parser
|||xml parser


abstract public class Weather {
	private int weatherTemperature;
	private Boolean weatherReportIsReady;

	abstract public String getWeatherReport();

	@XmlElement
	public int getWeatherTemperature() {
		return weatherTemperature;
	}

	public void setWeatherTemperature(int weatherTemperature) {
		this.weatherTemperature = weatherTemperature;
	}

	@XmlElement
	public Boolean getWeatherReportIsReady() {
		return weatherReportIsReady;
	}

	public void setWeatherReportIsReady(Boolean weatherReportIsReady) {
		this.weatherReportIsReady = weatherReportIsReady;
	}
}


//---

@XmlRootElement
public class CityWeather extends Weather {

	private String weatherCity;

	@XmlElement
	public String getWeatherCity() {
		return weatherCity;
	}

	public void setWeatherCity(String weatherCity) {
		this.weatherCity = weatherCity;
	}

	@Override
	public int getWeatherTemperature() {
		return super.getWeatherTemperature();
	}

	@Override
	public void setWeatherTemperature(int temperature) {
		super.setWeatherTemperature(temperature);
	}

	@Override
	public Boolean getWeatherReportIsReady() {
		return super.getWeatherReportIsReady();
	}

	@Override
	public void setWeatherReportIsReady(Boolean weatherReportIsReady) {
		super.setWeatherReportIsReady(weatherReportIsReady);
	}
	
	public String getWeatherReport() {
		if(getWeatherReportIsReady()) {
			return "The temperature for " + weatherCity + " will be: " + getWeatherTemperature() + "oC."
		} else {
			return "The weather report is not ready yet for this city."
		}
	}
}

//---

import org.dom4j.Element;

public interface WeatherParser {
	public abstract Weather parse(Element weatherRootElement) throws Exception;
}


//---

import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.dom4j.DocumentHelper;
import org.dom4j.Attribute;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.XPath;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CityWeatherParser implements WeatherParser {

    public static final String WEATHER_CITY = "@city";
    public static final String WEATHER_TEMPERATURE = "cwn:temperature";
    public static final String WEATHER_REPORT_IS_READY = "cwn:weather/cwn:report/@isReady";
    // other xpath examples:
    // public static final String WEATHER_SUNNY_IMAGE= "cwn:images[@type='sunny-image']/cwn:image";
    // public static final String WEATHER_ERROR = "//cwn:error";

	private String cityWeatherNamespaceUri = "http://www.exampleweather.co.uk/cityweather";	
	
	@Override
	public Weather parse(Element weatherRootElement, CityWeather cityWeatherContentObj) {
		cityWeatherContentObj.setWeatherCity(CityWeatherParserHelper.getValueAsString(grabXPath(element, WEATHER_CITY), element));
		cityWeatherContentObj.setWeatherTemperature(CityWeatherParserHelper.getValueAsInt(grabXPath(element, WEATHER_TEMPERATURE), element));
		cityWeatherContentObj.setWeatherReportIsReady(CityWeatherParserHelper.getValueAsBooleanForAttribute(grabXPath(element, WEATHER_REPORT_IS_READY), element));

		// other parsing example imaginary scenarios:
		// cityWeatherContentObj.setSomeVar1(element.attributeValue("exampleAttributeName"));
	}


    public XPath grabXPath(Element element, String xpathAsString) {
        return generateCityWeatherXPathWithNamespaceUri(element, xpathAsString);
    }
    public XPath generateCityWeatherXPathWithNamespaceUri(Element element, String xpathAsString) {
        XPath newWeatherXPath =  DocumentHelper.createXPath(xpathAsString);
		Map<String, String> weatherNamespaceMap = new HashMap<String, String>();
		String weatherNamespace = (element == null) ? cityWeatherNamespaceUri : element.getNamespaceURI();
        // cwn = city weather namespace
        weatherNamespaceMap.put("cwn", weatherNamespace);
        newWeatherXPath.setNamespaceURIs(weatherNamespaceMap);
        return newWeatherXPath;
    }

	public static final String WEATHER_CHILDREN_XPATH_SELECTOR = "cwn:weather/cwn:children/cwn:child";
    public List<CityWeather> parseWeatherChildren(Element childrenElement) {

    	List<CityWeather> cityWeathersList = new ArrayList<CityWeather>();
    	List<Element> elementsList = grabXPath(childrenElement, WEATHER_CHILDREN_XPATH_SELECTOR).selectNodes(childrenElement);
    	Iterator<Element> elementIterator = elementsList.iterator();

		while(elementIterator.hasNext()) {
            CityWeather cityWeather = new CityWeather();
            Element child = elementIterator.next();
            parse(child, cityWeather);
            cityWeathersList.add(cityWeather);
        }

		return cityWeathersList;    	
    }

	@SuppressWarnings("unchecked")
    public void randomExampleMethod1() {
		Attribute attribute = element.attribute("exampleAttributeName1");
		if(BooleanUtils.toBoolean("true")) {
			attribute.setValue("Some attribute value");
		}
	}
}



//---

import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.XPath;

public class CityWeatherParserHelper {
	
	public static String getValueAsString(Element element) {
        if (element == null) {
            return null;
        } else {
            return element.getText();
        }
    }

    public static String getValueAsString(XPath xpath, Element element) {
        Node outcomeNode = xpath.selectSingleNode(element);
        if (outcomeNode != null) {
            return outcomeNode.getText();
        } else {
            return null;
        }
    }

	public static int getValueAsInt(Element element) {
        if (element == null) {
            return null;
        } else {
            // return Integer.valueOf(element.getText());
            return Integer.getInteger(element.getText());
        }
    }

    public static int getValueAsInt(XPath xpath, Element element) {
        Node outcomeNode = xpath.selectSingleNode(element);
        if (outcomeNode != null) {
            // return Integer.valueOf(outcomeNode.getText());
            return Integer.getInteger(outcomeNode.getText());
        } else {
            return null;
        }
    }

    public static Boolean getValueAsBooleanForAttribute(Element element, String attributeName) {
        String attributeValue = element.attributeValue(attributeName);
        if(attributeValue != null) {
            return Boolean.valueOf(attributeValue);
        } else {
            return null;
        }
    }

    public static String getElementAsXml(XPath xpath, Element element) {
        Node outcomeNode = xpath.selectSingleNode(element);
        if (outcomeNode != null) {
            return outcomeNode.asXML();
        } else {
            return null;
        }
    }
}

//---


public class WeatherParsersFactory {

	private Map<String, WeatherParser> weatherParsersMap = new HashMap<String, WeatherParser>();

	private CityWeatherParser cityWeatherParser = new CityWeatherParser();
	private OtherWeatherParser otherWeatherParser = new OtherWeatherParser();

	public void init() {
		weatherParsersMap.put("cityWeather", cityWeatherParser);
		weatherParsersMap.put("otherWeather", otherWeatherParser);
	}

	public WeatherParser getParser(String parserType) {
		WeatherParser weatherParser = weatherParsersMap.get(parserType);
		if (weatherParser == null) {
			throw new Exception("Unsupported asset type: " + parserType);
		}
		return weatherParser;	
	}
}


/*--------------------------------*/


|||java comment
|||javadoc

// http://www.oracle.com/technetwork/articles/java/index-137868.html

/**
 * This is a documentation comment.
 * The JDK javadoc tool uses doc comments when preparing automatically generated documentation.
 * Explanation of what the method does.
 *
 * @param exampleParam1 - explanation what it is
 * @param exampleParam2 - explanation what it is
 * @return the result
 * @throws java.lang.Exceptio
 */

// Single line comment.

/*
Multi-line comment.
*/


/*--------------------------------*/

|||java json compare json objects rather than json strings
|||compare json java

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(MockitoJUnitRunner.class)
public class ExampleJavaJsonCompareTestClass {

    @Test
    public void testExampleJSONPayload() throws Exception {

    	String expectedExampleJSONString = "{}";
    	String actualExampleJSONString = "{}";

        ObjectMapper mapper = new ObjectMapper();
        JsonNode payload = mapper.readTree(expectedExampleJSONString);

        Assert.assertEquals(payload, mapper.readTree(actualExampleJSONString));
    }
}


/*--------------------------------*/

|||java json serialiser
|||json serialiser
|||json to string
|||json parsing


import java.io.IOException;

import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectWriter;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.JsonGenerationException;

public class ExampleDefaultJsonSerialiserUsingJackson {

	/**
	 * Converts Object -> JSON string using the default pretty print writer.
	 * Poperties with null value will be ignored.
	 */
	public String serialiseObjectToJSON(Object objToSerialize, Class<?> serializationViewToBeUsed, Boolean injectJSONTypeInfo) throws ExampleCustomSerialisationException {
		String jsonString = null;
		jsonString = "{}";
		
		ObjectMapper defaultObjectMapper = new ObjectMapper();
		
		defaultObjectMapper.configure(DeserializationConfig.Feature.READ_ENUMS_USING_TO_STRING, true);

		defaultObjectMapper.getSerializationConfig().setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
		
		if(injectJSONTypeInfo){
			defaultObjectMapper.getSerializationConfig().addMixInAnnotations(ExampleContentObj3.class, ExampleJsonAnnotatedFoundationMixin.ExampleContentObj3FoundationMixin.class);
		}
		
		ObjectWriter defaultObjectWriter = defaultObjectMapper.viewWriter(serializationViewToBeUsed).withDefaultPrettyPrinter();
		
		try {
			// serialised json as string
			jsonString = defaultObjectWriter.writeValueAsString(value);

			// deserialised json string as a json content object
			// you can use this to test that the deserialisation is successful
			ExampleContentObj3 deserialisedJson = mapper.readValue(jsonString, ExampleContentObj3.class);

		} catch (JsonGenerationException e) {
			throw new ExampleCustomSerialisationException(e);
		} catch (JsonMappingException e) {
			throw new ExampleCustomSerialisationException(e);
		} catch (IOException e) {
			throw new ExampleCustomSerialisationException(e);
		}
		return jsonString;
	}
}

//---


public interface DefaultVersionViews {
	 static class DefaultDeprecate { }
	 static class V1_0_21 { }
}

import org.codehaus.jackson.map.annotate.JsonView;

public class ExampleUseOfExampleDefaultJsonSerialiserUsingJacksonPerhapsForTests {

	private static class DefaultVersionedContentObject extends SomeContentObject {
		private String someString = "";
	
		public void setSomeString(String str) {
			this.someString = str;
		}
	
		@JsonView(DefaultVersionViews.DefaultDeprecate.class)
		public String getSomeString() {
			return someString;
		}
	}

	DefaultVersionedContentObject defaultVersionedContentObject  = DefaultVersionedContentObject();


	String serialisedJson = null;
	serialisedJson = new ExampleDefaultJsonSerialiserUsingJackson().serialiseObjectToJSON(defaultVersionedContentObject, DefaultVersionViews.V1_0_21.class, false);

	JSONObject someJsonObject = new JSONObject(serialisedJson);
	assertTrue(jsonObject.has("nameOfSomeJsonFieldElement"));
}


//---

import org.codehaus.jackson.annotate.JsonSubTypes;
import org.codehaus.jackson.annotate.JsonTypeInfo;

public class ExampleJsonAnnotatedFoundationMixin {

	@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "jsonSubTypeInfo")
	@JsonSubTypes({ @JsonSubTypes.Type(value = ExampleContentObj1.class, name = "ExampleContentObj1"), @JsonSubTypes.Type(value = ExampleContentObj2.class, name = "ExampleContentObj2") })
	public static class ExampleContentObj3FoundationMixin {
	}	
}

//---

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonPropertyOrder;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@JsonPropertyOrder({"exampleObjectFieldName", "exampleObjectFieldName2"})
@XmlRootElement(name="exampleObjField")
@XmlType(propOrder={"exampleObjField2", "exampleObjField"})
public class ExampleContentObj3 {

	private String exampleObjField = "";

	@JsonProperty("exampleObjectFieldName")
	@XmlElement(name="exampleObjectFieldName")
	public String getExampleObjField() {
		return this.exampleObjField;
	}

	public void setExampleObjField(String newValue) {
		this.exampleObjField = newValue;
	}

	private String exampleObjField2 = "";

	@JsonProperty("exampleObjectFieldName2")
	@XmlElement(name="exampleObjectFieldName2")
	public String getExampleObjField2() {
		return this.exampleObjField2;
	}

	public void setExampleObjField2(String newValue) {
		this.exampleObjField2 = newValue;
	}

	private String exampleObjField3 = "";

	@XmlTransient
	@JsonIgnore
	public String getExampleObjField3() {
		return this.exampleObjField3;
	}

	public void setExampleObjField3(String newValue) {
		this.exampleObjField3 = newValue;
	}
}

//---

|||java json
|||java json parse
|||java json serialise
|||java json deserialise

import org.apache.commons.io.IOUtils;

import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

public class ExampleJsonParser {

	private String someJsonAsString = "{}";

	JSONObject jsonObj1 = new JSONObject(someJsonAsString);
	JSONObject jsonObj2extractWithArrayIndex = jsonObj1.getJSONArray("someJsonFieldName").getJSONObject(0);
	JSONObject jsonObj3extractWithFieldName = jsonObj1.getJSONObject("someJsonFieldName");
	JSONObject jsonObj4extractFieldAsObject = jsonObj1.get("someJsonFieldName");
	JSONArray jsonArray1 = jsonObj1.getJSONArray("someJsonFieldName");
	boolean getBooleanFromJsonWithFieldName = jsonObj1.getBoolean("someJsonFieldName");
	boolean doesJsonObjectContainField = jsonObj1.has("someJsonFieldName");
	int getIntFromJsonObject = jsonObj1.getInt("someJsonFieldName");
	String getStringFromJson = jsonObj1.getString("someJsonFieldName");

	private JSONObject searchJsonElements(JSONArray elements, String name) throws Exception {
		for (int i = 0; i < elements.length(); i++) {
			JSONObject singleElement = elements.getJSONObject(i);
			if (name.equals(singleElement.getString("name"))) {
				return singleElement;
			}
			if (singleElement.has("elements")) {
				JSONObject matchingSubElements = searchJsonElements(singleElement.getJSONArray("elements"), name);
				if (matchingSubElements != null) {
					return matchingSubElements;
				}
			}
		}
		return null;
	}
}


/*--------------------------------*/



|||java
|||spring
|||spring scheduling
|||java spring
|||feature flag
|||feature flag monitoring


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;

@Component
public class ExampleFeatureFlagMonitor {

    private static final Logger LOG = LoggerFactory.getLogger(ExampleFeatureFlagMonitor.class);

    private Map<String, String> exampleFeatureFlagValues = newHashMap();
    private Map<String, FeatureFlagContentObject> exampleFeatureFlags = newHashMap();

    public static final String SWITCH-ON = "ON";
    public static final String SWITCH-OFF = "OFF";

    public static final String EXAMPLE-DEFAULT = "example-default";

    @PostConstruct
    public void init() {
        addFeatureFlag(EXAMPLE-DEFAULT, SWITCH-ON);
    }

    public void addFeatureFlag(String name, String flagValue) {
        LOG.info("Adding feature flag for monitoring: " + name);

        exampleFeatureFlagValues.put(name, flagValue);
        exampleFeatureFlagInputStream.put(name,
                new FeatureFlagContentObject()
                        .setFeatureFlagName(name)
                        .setFeatureFlagFileSystemPath(name));
    }

    @Autowired
    private ExampleSchedulingDispatcher exampleSchedulingDispatcher;

    @Scheduled(fixedRate = 300000)
    private void exampleFeatureFlagUpdater() {
        if (exampleSchedulingDispatcher.shouldExampleSchedulingDispatcherRun()) {
            try {
                LOG.info("Running ExampleFeatureFlagMonitor.");
                updateExampleFeatureFlags();
            } catch (Exception e) {
                LOG.error("Error while updating feature flag values.", e);
            }
        }
    }

    public void updateExampleFeatureFlags() {
        for (String featureFlagName : exampleFeatureFlagValues.keySet()) {
            FeatureFlagContentObject ffContentObj = exampleFeatureFlags.get(featureFlagName);

            if (ffContentObj.isModified()) {
                updateExampleFeatureFlag(featureFlagName, ffContentObj.getExampleFeatureFlagValue());
            }
        }
    }

    public void updateExampleFeatureFlag(String featureFlagName, String featureFlagVal) {
        if (featureFlagVal != null) {
            LOG.warn("Updating " + featureFlagName + " -> " + featureFlagVal);
            exampleFeatureFlagValues.put(featureFlagName, featureFlagVal);
        }
    }        

    public boolean isON(String featureFlagName) {
        return SWITCH-ON.equals(exampleFeatureFlagValues.get(featureFlagName));
    }

    public boolean isOFF(String featureFlagName) {
        return SWITCH-OFF.equals(exampleFeatureFlagValues.get(featureFlagName));
    }    
}


//--- 


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ExampleSchedulingDispatcher {

    private String env = System.getenv("DEFAULT_SYSTEM_EXECUTION_SERVER_ENV");

    // The value of "is.example.scheduling.dispatcher.active" is defined in a properties file eg. exampleProperties.properties
    @Value("${is.example.scheduling.dispatcher.active}")
    private Boolean isExampleDispatcherActive;

    public boolean getIsExampleDispatcherActive() {
        if (isExampleDispatcherActive != null && isExampleDispatcherActive) {
            return true;
        }
        return false;
    }

    public boolean shouldDispatcherBeActiveForEnv() {
        return env.equalsIgnoreCase("Live") || env.equalsIgnoreCase("Test");
    }

    public Boolean shouldRunScheduleForEnv() {
        if (getServerEnv().equalsIgnoreCase("Dev")) {
            return false;
        }
        return true;
    }

    public Boolean shouldExampleSchedulingDispatcherRun() {
        if (shouldDispatcherBeActiveForEnv() && shouldRunScheduleForEnv()) {
            return true;
        }
        return false;
    }

    public void setExampleDispatcherActive(Boolean isExampleDispatcherActive) {
        this.isExampleDispatcherActive = isExampleDispatcherActive;
    }
}



//---


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ExampleMemoryStatsMonitoringSampler {

    private static final String FEATURE-FLAG-ID = "example-feature-flag-id";

    @Qualifier("exampleStatsMonitoringSampler") //spring java bean
    @Autowired
    ExampleStatsMonitoringSampler exampleStatsMonitoringSampler;

    @Autowired
    FeatureFlagDefaultHandling featureFlagDefaultHandling;

    @Autowired
    private ExampleSchedulingDispatcher exampleSchedulingDispatcher;

    @Scheduled(fixedRate = 500000)
    public void featureFlagController() {
        if (exampleSchedulingDispatcher.shouldExampleSchedulingDispatcherRun()) {
            initialiser();
        } else {
            dummyInitialiser();
        }
    }

    private void initialiser() {
        if (flagpoleAction().isProceed()) {
            assetWhiteListFilter.setActive(true);
        } else {
            LOG.warn("Whitelisting flagpole is false so turning off whitelist activation");
            assetWhiteListFilter.setActive(false);
        }
    }

    private FeatureFlagOperation featureFlagOperation() {
        return featureFlagDefaultHandling.getFeatureFlagOperation(FEATURE-FLAG-ID);
    }
}



//---


import com.google.common.base.Charsets;
import com.google.common.io.Files;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;

public class FeatureFlagContentObject {

    public static final String DEFUALT-FEATURE-FLAG-PATH = "/example/default/path/";
    private static final String FEATURE-FLAG-FILE-EXTENTION = "flag";

    private Long dateItChanged;
    private String featureFlagName;
    private String featureFlagFileSystemPath;

    public FeatureFlagContentObject setFeatureFlagName(String featureFlagName) {
        this.featureFlagName = featureFlagName;
        return this;
    }

    public FeatureFlagContentObject setFeatureFlagFileSystemPath(String fetureFlagName) {
        this.featureFlagFileSystemPath = FilenameUtils.separatorsToSystem(String.format("%s%s.%s", DEFUALT-FEATURE-FLAG-PATH, fetureFlagName, FEATURE-FLAG-FILE-EXTENTION));
        return this;
    }

    public FeatureFlagContentObject setFeatureFlagFileSystemBASEDIRPath(String fetureFlagBaseDirPath) {
        this.featureFlagFileSystemPath = FilenameUtils.separatorsToSystem(String.format("%s%s.%s", fetureFlagBaseDirPath, featureFlagName, FEATURE-FLAG-FILE-EXTENTION));
        return this;
    }

    public String getFeatureFlagName() {
        return featureFlagName;
    }

    public String getFeatureFlagFileSystemPath() {
        return featureFlagFileSystemPath;
    }

    public boolean hasChanged() {
        boolean hasChanged = false;
        try {
            File file = new File(featureFlagName);
            long lastChanged = file.lastModified();

            if (dateItChanged == null || dateItChanged.longValue() != lastChanged) {
                dateItChanged = lastChanged;
                hasChanged = true;
            }

        } catch (Exception e) {
            LOG.error("Couldn't read file last changed date: " + featureFlagName, e);
        }
        return hasChanged;
    }

    public List<String> readFeatureFlagFileFromPath(String featureFlagFileSystemPath) {
        List<String> lines = null;
        try {
            File exampleFeatureFlagFile = new File(featureFlagFileSystemPath);
            exampleFileLines = Files.readLines(exampleFeatureFlagFile, Charsets.UTF_8);
        } catch (FileNotFoundException fe) {
            LOG.error("Cannot find file: " + featureFlagFileSystemPath, fe);
        } catch (Exception e) {
            LOG.error("Trouble reading flag file", e);
        }
        return exampleFileLines;
    }

    public String findExampleFeatureFlagLine(List<String> featureFlaglines) {
        String foundLine = null;
        for (String line : featureFlaglines) {
            if (line.startsWith(featureFlagName)) {
                foundLine = line;
            }
        }
        return foundLine;
    }

    public String parseFeatureFlagLine(String featureFlagline) {
        return featureFlagline.substring(featureFlagline.indexOf(featureFlagName) + featureFlagName.length() + 1).trim();
    }

    public String getExampleFeatureFlagValue() {
        List<String> exampleFeatureFlagLines = readFeatureFlagFileFromPath(featureFlagFileSystemPath);

        String exampleFeatureFlagValue = null;

        if (!exampleFeatureFlagLines.isEmpty()) {
            exampleFeatureFlagValue = parseFeatureFlagLine(findExampleFeatureFlagLine(exampleFeatureFlagLines));
        }

        return exampleFeatureFlagValue;
    }
}



//---


public class FeatureFlagOperation {

    private String featureFlagMessage;
    private boolean featureFlagOperation;

    public FeatureFlagOperation() {}

    public boolean getFeatureFlagOperation() {
        return featureFlagOperation;
    }

    public FeatureFlagOperation setFeatureFlagOperation(boolean featureFlagOperation) {
        this.featureFlagOperation = featureFlagOperation;
        return this;
    }

    public String getFeatureFlagMessage() {
        return featureFlagMessage;
    }

    public FeatureFlagOperation setFeatureFlagOperation(String featureFlagMessage) {
        this.featureFlagMessage = featureFlagMessage;
        return this;
    }
}


//---


public interface FeatureFlagHandling {
    public FeatureFlagOperation getFeatureFlagOperation(String featureFlagId);
}


import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class FeatureFlagDefaultHandling implements FeatureFlagHandling {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureFlagDefaultHandling.class);

    private ExampleFeatureFlagMonitor exampleFeatureFlagMonitor;

    @Autowired
    FeatureFlagDefaultHandling(ExampleFeatureFlagMonitor exampleFeatureFlagMonitor) {
        this.exampleFeatureFlagMonitor = exampleFeatureFlagMonitor;
    }

    @Override
    public FeatureFlagOperation getFeatureFlagOperation(String featureFlagId) {
        FeatureFlagOperation opearation = featureFlagDefaultOperation();

        if (StringUtils.isNotBlank(featureFlagId)) {
            opearation = changeFeatureFlagOperation(opearation, featureFlagId);
        }
        return opearation;
    }

    private FeatureFlagOperation featureFlagDefaultOperation() {
        return new FeatureFlagOperation().setFeatureFlagOperation(true).setFeatureFlagOperationMessage(null);
    }

    private FeatureFlagOperation changeFeatureFlagOperation(FeatureFlagOperation operation, String featureFlagId) {
        if (exampleFeatureFlagMonitor.isOFF(featureFlagId)) {
            operation.setFeatureFlagOperation(false).setFeatureFlagOperationMessage("Feature Flag id: " + featureFlagId + " is set to: " + false);
            LOG.warn("Feature Flag id: " + featureFlagId + " is set to: " + false);
        }
        return operation;
    }
}

//---


|||feature flag test example
|||java junit test
|||java mock
|||java mockito
|||java assert

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ExampleFeatureFlagTestClass1 {

	@Mock
	ExampleFeatureFlagMonitor exampleFeatureFlagMonitor;
	
	private FeatureFlagDefaultHandling featureFlagDefaultHandling;
	
	@Before
	public void setUp() throws Exception {
	    featureFlagDefaultHandling = new FeatureFlagDefaultHandling(exampleFeatureFlagMonitor);
	}
	
	 @Test
	 public void featureflag_operation_should_return_false_if_featureflag_is_off() {
	     String featureFlagId = "someFeatureFlagId";
	     when(exampleFeatureFlagMonitor.isOFF(featureFlagId)).thenReturn(true);
	     FeatureFlagOperation featureFlagOperation = featureFlagDefaultHandling.getFeatureFlagOperation(featureFlagId);
	     assertFalse(featureFlagOperation.getFeatureFlagOperation());
	 }
}

//---

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.assertTrue;

@RunWith(MockitoJUnitRunner.class)
public class ExampleFeatureFlagTestClass2 {

	@InjectMocks
	ExampleFeatureFlagMonitor exampleFeatureFlagMonitor;
	
	@Before
	public void setUp() throws Exception {
	    exampleFeatureFlagMonitor.init();
	}

	@Test
    public void some_featureflag_should_be_on_after_initialisation() {
        assertTrue(exampleFeatureFlagMonitor.isON("defaultFeatureFlagId"));
    }
}


//---


/*--------------------------------*/


||| java certificate email validation

import org.apache.cxf.phase.PhaseInterceptorChain;
import org.apache.cxf.message.Message;

private Message exampleMessage = PhaseInterceptorChain.getCurrentMessage();

parseEmailFromCertificate(exampleMessage);

protected String parseEmailFromCertificate(org.apache.cxf.message.Message message) {
    Map<String, List<String>> exampleHeaders =  (Map<String, List<String>>) message.get(org.apache.cxf.message.Message.PROTOCOL_HEADERS);

    String extractedEmail = "";
    String exampleEmailToMatch = "Email Address=example@exampleEmail.com";
    int groupNumber = 1;

    private static final Pattern EXAMPLE_PATTERN_OF_EMAIL = Pattern.compile("[Ee]mail(Address)?=([A-Za-z0-9._&-]{3,}@(([A-Za-z0-9-]+\\.)+)?([A-Za-z0-9-]+))");

    private static final Pattern EXAMPLE_PATTERN_FOR_OU = Pattern.compile("OU=(.[^,]*)");

    Matcher email_matcher = EXAMPLE_PATTERN_OF_EMAIL.matcher(exampleEmailToMatch);
    extractedEmail = email_matcher.find()?matcher.group(groupNumber):null;

    String exampleCertSubject = "example cert subject";

    if(StringUtils.isBlank(exampleCertSubject)) {
        return null;
    } else {
        Matcher ou_matcher = OU_PATTERN.matcher(exampleCertSubject);
        String ou = ou_matcher.find()?matcher.group(1):null;
    }
}



/*--------------------------------*/

|||java exception handling
|||exception handling

		String a = "";
        try {
            a = IOUtils.toString(getClass().getClassLoader().getResourceAsStream("exampleFileName.txt"));
        } catch (IOException e) {
            LOG.warn("Exception:" + e);
            e.printStackTrace();
        }

/*--------------------------------*/

|||java custom exception
|||java exception handling
|||exception handling

public class ExampleCustomException extends Exception {

    public ExampleCustomException(String message, Throwable cause) {
            super(message, cause);
    }

    public ExampleCustomException(String message) {
            super(message);
    }
}

/*--------------------------------*/

|||java try catch finally
|||java exception handling
|||exception handling

try {
    // Do some processing ...
} catch (Exception e) {
    LOG.error("Example error message: " + e.getMessage());
} finally {
    return null;
}


/*--------------------------------*/


|||java ioexception
|||java exception handling
|||exception handling

import java.io.IOException;

public void example() throws IOException {
    throw new IOException("Example");
}


/*--------------------------------*/

|||java exception handling
|||exception handling
|||java IllegalArgumentException

import java.lang.IllegalArgumentException;

public String exampleIllegalArgumentExceptionMethod(String exampleString) throws IllegalArgumentException { 
    if (exampleString == null) {
        throw new IllegalArgumentException("Argument cannot be null.");
    }
    return exampleString;
}


/*--------------------------------*/

|||java encoding
|||encoding

import org.apache.commons.io.IOUtils;

private static final String UTF-8_ENCODING = "UTF-8";

String exampleEncodedString = IOUtils.toString("Example string.", UTF-8_ENCODING);

//---

String result = new String(input.getBytes(Charset.forName("UTF8")));

//---
private JsonEncoding encoding = JsonEncoding.UTF8; response.setCharacterEncoding(encoding.getJavaName());

//---
https://code.google.com/p/concordion/source/browse/trunk/concordion/src/test/java/spec/concordion/command/
assertEquals/whitespace/WhitespaceTest.java?r=591 private static String
replaceNamedWhitespaceWithRealWhitespaceCharacters(String s) { return s.replaceAll("\\[SPACE\\]", " ")
.replaceAll("\\[TAB\\]", "\t") .replaceAll("\\[LF\\]", "\n") .replaceAll("\\[CR\\]", "\r");
    }
    }
    }


/*--------------------------------*/

|||java string to list

String[] organizationalUnits = filterConfig.getInitParameter("whiteOuList").split(","); def(status, text) =
Arrays.asList(removeBrackets.split("\\s*,\\s*"))


/*--------------------------------*/

|||java url
|||java encoding

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;

public void exampleURLMethod() throws MalformedURLException, UnsupportedEncodingException {
    String exampleUrlString = "http://www.example.com";
    URL exampleURL = new URL(exampleUrlString);
    exampleUrlString.getBytes("UTF-8");
}


/*--------------------------------*/




|||java enum

// https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html

public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
    THURSDAY, FRIDAY, SATURDAY 
}


public class EnumTest {
    Day day;
    
    public EnumTest(Day day) {
        this.day = day;
    }
    
    public void tellItLikeItIs() {
        switch (day) {
            case MONDAY:
                System.out.println("Mondays are bad.");
                break;
                    
            case FRIDAY:
                System.out.println("Fridays are better.");
                break;
                         
            case SATURDAY: case SUNDAY:
                System.out.println("Weekends are best.");
                break;
                        
            default:
                System.out.println("Midweek days are so-so.");
                break;
        }
    }
    
    public static void main(String[] args) {
        EnumTest firstDay = new EnumTest(Day.MONDAY);
        firstDay.tellItLikeItIs();
        EnumTest thirdDay = new EnumTest(Day.WEDNESDAY);
        thirdDay.tellItLikeItIs();
        EnumTest fifthDay = new EnumTest(Day.FRIDAY);
        fifthDay.tellItLikeItIs();
        EnumTest sixthDay = new EnumTest(Day.SATURDAY);
        sixthDay.tellItLikeItIs();
        EnumTest seventhDay = new EnumTest(Day.SUNDAY);
        seventhDay.tellItLikeItIs();
    }
}

/*
The output is:

Mondays are bad.
Midweek days are so-so.
Fridays are better.
Weekends are best.
Weekends are best.
*/



public enum Planet {
    MERCURY (3.303e+23, 2.4397e6),
    VENUS   (4.869e+24, 6.0518e6),
    EARTH   (5.976e+24, 6.37814e6),
    MARS    (6.421e+23, 3.3972e6),
    JUPITER (1.9e+27,   7.1492e7),
    SATURN  (5.688e+26, 6.0268e7),
    URANUS  (8.686e+25, 2.5559e7),
    NEPTUNE (1.024e+26, 2.4746e7);

    private final double mass;   // in kilograms
    private final double radius; // in meters
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }
    private double mass() { return mass; }
    private double radius() { return radius; }

    // universal gravitational constant  (m3 kg-1 s-2)
    public static final double G = 6.67300E-11;

    double surfaceGravity() {
        return G * mass / (radius * radius);
    }
    double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Usage: java Planet <earth_weight>");
            System.exit(-1);
        }
        double earthWeight = Double.parseDouble(args[0]);
        double mass = earthWeight/EARTH.surfaceGravity();
        for (Planet p : Planet.values())
           System.out.printf("Your weight on %s is %f%n",
                             p, p.surfaceWeight(mass));
    }
}

/*
If you run Planet.class from the command line with an argument of 175, you get this output:

$ java Planet 175
Your weight on MERCURY is 66.107583
Your weight on VENUS is 158.374842
Your weight on EARTH is 175.000000
Your weight on MARS is 66.279007
Your weight on JUPITER is 442.847567
Your weight on SATURN is 186.552719
Your weight on URANUS is 158.397260
Your weight on NEPTUNE is 199.207413
*/




/*--------------------------------*/

|||java equals
|||java hashcode


import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;


    private Map<int, String> exampleHashMap1 = new HashMap<int, String>();
    private Map<int, String> exampleHashMap2 = new HashMap<int, String>();
    private Map<int, String> exampleHashMap3 = new HashMap<int, String>();

    @Override
    public int hashCode() {
         return new HashCodeBuilder(15, 17).
                   append(exampleHashMap1).
                   append(exampleHashMap2).
                   append(exampleHashMap3).
                   toHashCode();
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj == null) { return false; }
        if (obj.getClass() != getClass()) {
            return false;
        }       
        if (obj == this) { return true; }

           ExampleObject rhs = (ExampleObject) obj;
           return new EqualsBuilder()
                        //.append(lhs, rhs)
                         .append(exampleHashMap1, rhs.exampleHashMap1)
                         .append(exampleHashMap2, rhs.exampleHashMap2)
                         .append(exampleHashMap3, rhs.exampleHashMap3)
                         .isEquals();
    }

public class ExampleObject {}




/*--------------------------------*/


|||java map
|||map
|||linkedhashmap

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

Map<int, String> exampleIntStringMap = new HashMap<int, String>();

if (exampleIntStringMap != null) {
    for (Entry<int, String> exampleMapEntry : exampleIntStringMap.entrySet()) {
        return (exampleMapEntry.getKey(), exampleMapEntry.getValue());
    }
}

|||java linkedhashmap

import java.util.LinkedHashMap;
import java.util.Collections;

Map<int, String> exampleIntStringLinkedHashedMap = new LinkedHashMap<int, String>();

public Map<int, String> getExampleIntStringLinkedHashedMap() {
        return Collections.unmodifiableMap(exampleIntStringLinkedHashedMap);
}


//---

|||java map
|||guava map
|||google guava map
|||immutable map
|||map initialisation

https://stackoverflow.com/questions/9489384/initializing-a-guava-immutablemap
https://stackoverflow.com/questions/5947869/immutablemap-of-workaround-for-hashmap-in-maps

//No
ImmutableMap.of("a", 1,); 

//Yes
ImmutableMap<String, Object> map = ImmutableMap.builder()
    .put(key, value);
    .build();


/*--------------------------------*/


|||set
|||java set
|||hashset

import java.util.Set;
import java.util.HashSet;

Set<String> exampleHashSet = new HashSet<String>();


/*--------------------------------*/
|||brilliant ternary expression
|||ternary expression
|||ternary operation
|||ternary operator

condition ? value_if_true : value_if_false

1 == 1 ? 1 : 0


// Brilliant Ternary operation for checking not null and atomiclong and long!

numberOfDocuments == null ? 0 : numberOfDocuments.toLong()


/*--------------------------------*/

|||Integer vs int

public Integer getIntegerObject() {
    return new Integer(1);
}

public int getInt() {
    return 1;
}

/*--------------------------------*/

|||atomicinteger
|||java atomicinteger

AtomicInteger exampleAtomicInteger = new AtomicInteger(0);
exampleAtomicInteger.incrementAndGet();
exampleAtomicInteger.get();


/*--------------------------------*/

|||todo comment

// TODO: To-do comment.

/*--------------------------------*/



|||springframework
|||javax xml
|||xml
|||java xml
|||xml annotation
|||java json
|||json annotation
|||spring xml
|||spring json
|||java spring xml enum
|||jaxb

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlElementWrapper;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.annotate.JsonPropertyOrder;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.annotate.JsonProperty;

import java.util.List;

@JsonPropertyOrder(alphabetic=true)
@JsonPropertyOrder({"variable1", "variable2"})
@XmlType(propOrder={"variable1", "variable2"})

@XmlRootElement
public class ExampleClass extends AbstractExampleClass {
    private VariableType1 variable1;
    private VariableType2 variable2;
    private VariableType3 variable3;
    private VariableType4 variable4;
    private VariableType5 variable5;
    private VariableType6 variable6;

    private List<String> listOfStrings = new ArrayList<IStringtem>();

    @XmlElement
    public VariableType1 getVariable1() {
        return variable1;
    }

    public void setVariable1(Variable1Type var1) {
        this.variable1 = var1;
    }

    @XmlElement
    public VariableType2 getVariable2() {
        return variable2;
    }

    public void setVariable2(Variable2Type var2) {
        this.variable2 = var2;
    }

    @JsonSerialize(include = JsonSerialize.Inclusion.NON_DEFAULT)
    @XmlJavaTypeAdapter(ExampleAdaptor.class)
    public List<String> getListString() {
        return listOfStrings;
    }

    public void setListString(List<String> list) {
        this.listOfStrings = list;
    }

    @XmlAttribute
    public VariableType3 getVariable3() {
        return variable3;
    }

    public void setVariable3(Variable3Type var3) {
        this.variable3 = var3;
    }

    @JsonIgnore
    @XmlAttribute
    public VariableType4 getVariable4() {
        return variable4;
    }

    public void setVariable4(Variable4Type var4) {
        this.variable4 = var4;
    }

    @XmlTransient
    public VariableType5 getVariable5() {
        return variable5;
    }

    @JsonProperty("variable5")
    public void setVariable5(Variable5Type var5) {
        this.variable5 = var5;
    }

    public void setVariable6(Variable6Type var6) {
        this.variable5 = var6;
    }

    @XmlElementWrapper(name="variable6", nillable = true, required = true)
    public VariableType6 getVariable6() {
        return variable6;
    }
}

//---

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlAdapter;

import java.util.List;

public class ExampleAdaptor extends XmlAdapter<List<String>> {

    @Override
    public ExampleAdaptedList marshal(List<String> exampleStringList) throws Exception {
        if (list == null || list.isEmpty()) {
            return null;
        } else {
            return new ExampleAdaptedList(exampleStringList);
        }
    }

    @Override
    public List<String> unmarshal(ExampleAdaptedList exampleAdaptedList) throws Exception {
        if (exampleAdaptedList == null) {
            return null;
        } else {
            return exampleAdaptedList.toListOfStringsExampleMethod();
        }
    }

    @XmlType(namespace = "ExampleAdaptor")
    public static class ExampleAdaptedList {

        private List<String> stringList;

        ExampleAdaptedList(){}

        ExampleAdaptedList(List<String> list){this.stringList = list;}

        @XmlElement(name = "stringtype")
        public List<String> getList() {
            return stringList;
        }

        public void setListString(List<String> list) {
            this.stringList = list;
        }
    }
}

//---


import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;

import org.codehaus.jackson.annotate.JsonValue;

@XmlEnum(String.class)
public enum ExampleJavaSpringEnum {
    @XmlEnumValue("exampleEnum1") EXAMPLEENUM1("Example1"),
    @XmlEnumValue("exampleEnum2") EXAMPLEENUM2("Example2"),
    @XmlEnumValue("exampleEnum3") EXAMPLEENUM3("Example3");

    private final String exampleVariable1;


    public String stringToLowerCase() {
        return exampleVariable1.toLowerCase();
    }
    
    @Override
    @JsonValue
    public String toString() {
        return super.toString().stringToLowerCase();
    }
}

---

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;

JAXB example problem:
There is only one getter per ExampleAdaptedCollection and ExampleAdaptedCollection2 (e.g. getExampleDummyData()) when JAXB tries to unmarshal the XML into objects, it only calls the setter of the first ExampleAdaptedCollection, ExampleAdaptedCollection2 it finds. The propOrder attribute of ExampleAdaptedType's XmlType annotation dictates this, currently exampleType1, exampleType2 as the first instance of each of those classes.
This means that these setters must also call all the other necessary setters for other instances too.
An alternative solution could be using a different JAXB implementation such as EclipseLink MOXy.


/*--------------------------------*/

|||wadl

Adding ?_wadl&html at the end of your service will show all parameters for that endpoint.

https://example.api.int.com/example_path/index?_wadl&html


|||wadl
|||jaxrs wadl

import org.apache.cxf.jaxrs.model.wadl.Description;
import org.apache.cxf.jaxrs.model.wadl.Descriptions;
import org.apache.cxf.jaxrs.model.wadl.DocTarget;



/*--------------------------------*/



|||java regex
|||regex

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

private static final Pattern EXAMPLE_URI_PATTERN = Pattern.compile("^http(s?):\\/\\/[^\\/]+\\/[^\\/]+\\/(.*)$");


EXAMPLE_URI_PATTERN.matcher(exampleUriToCheck).matches()

//---

EXAMPLE_URI_PATTERN.matcher(uriInfo.getAbsolutePath().toString());

if (!matcher.matches()) {
System.print.out("Error!");
return null;
}

String exampleRelativeUriPath = matcher.group(2);


/*--------------------------------*/


|||java constant


private static final Integer SOME_JAVA_INTEGER_CONSTANT = 1;


/*--------------------------------*/



|||java for each


List<String> exampleStringList = new ArrayList<String>();

        for(String singleString :  exampleStringList){
            doSomeProcessing(singleString);
        }

/*--------------------------------*/

|||java arraylist
|||java list
|||arraylist
|||list


import java.util.List;
import java.util.ArrayList;

List<String> exampleStringArrayList1 = new ArrayList<String>();

List<String> exampleArrayList2 = Arrays.asList("string1", "string2", "string3")
    
//---

import org.apache.commons.collections.CollectionUtils;

List<String> exampleStringArrayList2 = new ArrayList<String>();

CollectionUtils.isEmpty(exampleStringArrayList2) ? null : exampleStringArrayList2;

//---

|||com.google.common.collect.Lists
|||lists

import com.google.common.collect.Lists;

Lists.newArrayList("<foo>bar</foo>", "<bar>foo</bar>");


/*--------------------------------*/

|||responsebuilder
|||javax.ws.rs.core.*
        
        import javax.ws.rs.core.*;
        import javax.ws.rs.core.Response.ResponseBuilder;
        
        ResponseBuilder responseBuilder = Response.fromResponse(response);
        ArrayList<String> varyHeadersArrayList = new ArrayList<String>();
        varyHeadersArrayList.add("Accept");
        varyHeadersArrayList.add("Cache-Control");
        varyHeadersArrayList.add("Content-Type");
        responseBuilder.header(HttpHeaders.VARY, varyHeaders);
        return responseBuilder.build();




/*--------------------------------*/

|||string
|||java string
|||string join

String.join(".", "string1", "string2", "string3");
// Result: "string1.string2.string3"


|||stringutils
|||isblank
|||contains

import org.apache.commons.lang.StringUtils;

StringUtils.contains(String str, String searchStr) 

StringUtils.isBlank("Example test string.")


//---


|||string
|||java string

public String exampleString1 = "Example string number - 1."

public String[] splitStrings = "a string, to split".split(",");

public String stringWithReplaceFirst = "".replaceFirst("")

public String = exampleString1.substring(0, exampleString1.indexOf("-"));

"example string".toUpperCase();

"EXAMPLE STRING".toLowerCase();

String.format("The competition started at (%s) and finished at (%s).", startTime, endTime)


//---


|||java string split

String[] arraySplitStrings = "/example/uri/relative/path".split("/")

if (arraySplitStrings != null && arraySplitStrings.length > 0) {
    //doSomeProcessing(...);
}


//---

|||java string trim

"exampleString".trim().length() == 0



//---


|||java stringbuilder
|||stringbuilder

StringBuilder exampleStringBuilder = new StringBuilder();
exampleStringBuilder.append("exampleString1");
exampleStringBuilder.append("+");
exampleStringBuilder.append("exampleString2");
return exampleStringBuilder.toString();

//---

StringBuilder exampleUriStringBuilder = new StringBuilder();
exampleUriStringBuilder.append(relativeUriPath);
exampleUriStringBuilder.append("?");
if (urlParameter1 != null) {
    exampleUriStringBuilder.append("urlParameter1Value=").append(urlParameter1).append("&");
}
if (urlParameter2 != null) {
    exampleUriStringBuilder.append("urlParameter1Value=true&");
}
return exampleUriStringBuilder.toString();


//---

|||string cutter


import org.apache.commons.lang.StringUtils;

public class StringCutter {

    // Cut a string to the last N characters, removing all line breaks and tabs.
    // Invalid input returns either the provided string or an empty string.
    public static String chopString(String str, int newLength){
        if (StringUtils.isEmpty(str)) return "";

        String shortenedString = str.replaceAll("\r", "").replaceAll("\n", "").replaceAll("\t", "");

        if (newLength < 0 || newLength > str.length()) return shortenedString;

        return shortenedString.substring(shortenedString.length()-newLength);
    }
}

/*--------------------------------*/

|||java stringbuilder
|||stringbuilder
|||java stringbuffer
|||stringbuffer
|||stringbuilder vs stringbuffer
|||stringbuffer vs stringbuilder

StringBuilder - NOT Synchronized - Not Thread Safe - Faster 
StringBuffer - Synchrinized - Thread Safe - Slower

/*--------------------------------*/

|||java switch
|||switch
|||bookmarks
|||links
https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html
https://stackoverflow.com/questions/4649423/should-switch-statements-always-contain-a-default-clause

/*--------------------------------*/


|||booleanutils
|||java booleanutils
|||toBoolean

import org.apache.commons.lang.BooleanUtils;

public boolean toBooleanExample = BooleanUtils.toBoolean("true");

public Boolean toBooleanObjectExample = BooleanUtils.toBooleanObject("true");


/*--------------------------------*/


|||java static class

https://stackoverflow.com/questions/7486012/static-classes-in-java

Java has static nested classes but it sounds like you're looking for a top-level static class. Java has no way of making a top-level class static but you can simulate a static class like this:

Declare your class final - Prevents extension of the class since extending a static class makes no sense
Make the constructor private - Prevents instantiation by client code as it makes no sense to instantiate a static class
Make all the members and functions of the class static - Since the class cannot be instantiated no instance methods can be called or instance fields accessed
Note that the compiler will not prevent you from declaring an instance (non-static) member. The issue will only show up if you attempt to call the instance member
Simple example per suggestions from above:

public class TestMyStaticClass {
     public static void main(String []args){
        MyStaticClass.setMyStaticMember(5);
        System.out.println("Static value: " + MyStaticClass.getMyStaticMember());
        System.out.println("Value squared: " + MyStaticClass.squareMyStaticMember());
        // MyStaticClass x = new MyStaticClass(); // results in compile time error
     }
}

// A top-level Java class mimicking static class behavior
public final class MyStaticClass {
    private MyStaticClass () { // private constructor
        myStaticMember = 1;
    }
    private static int myStaticMember;
    public static void setMyStaticMember(int val) {
        myStaticMember = val;
    }
    public static int getMyStaticMember() {
        return myStaticMember;
    }
    public static int squareMyStaticMember() {
        return myStaticMember * myStaticMember;
    }
}
What good are static classes? A good use of a static class is in defining one-off, utility and/or library classes where instantiation would not make sense. A great example is the Math class that contains some mathematical constants such as PI and E and simply provides mathematical calculations. Requiring instantiation in such a case would be unnecessary and confusing. See Java's Math class. Notice that it is final and all of its members are static. If Java allowed top-level classes to be declared static then the Math class would indeed be static.

shareeditflag
edited Mar 6 '15 at 16:38
answered Sep 20 '11 at 13:39

Paul Sasik
53k11100158

/*--------------------------------*/


|||date validation
|||org.joda.time.DateTime
|||joda time
|||java date


import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

    private void dateValidation(String date) throws Exception {
        try {
            DateTime.parse(date, DateTimeFormat.forPattern("yyyyMMdd"));
        } catch (IllegalArgumentException e) {
            throw new Exception("Invalid date: " + date);
        }
    }

//---

|||date validation
|||java date

private final static Pattern DEFAULT_DATE_FORMAT_PATTERN = Pattern.compile("^\\d{4}\\-\\d{2}\\-\\d{2}$");

public static boolean isDateStringInValidFormat(String dateString) {
	return DEFAULT_DATE_FORMAT_PATTERN.matcher(dateString).matches();
}

public static void validateDatesOrder(String startDate, String endDate) throws Exception {
	if (startDate == null)
		throw new Exception("Start date is empty!");
	if (endDate == null)
		throw new Exception("End date is empty!");
	if (endDate.compareTo(startDate) <= 0)
		throw new Exception(String.format("Start date (%s) should not be after end date (%s)!", startDate, endDate));
}


//---


private final static DateTimeFormatter EXAMPLE_DATE_FORMAT = DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss+00:00");

Long exampleSecondsSinceEpoch = 1L;
DateTime exampleDateTime = new DateTime(exampleSecondsSinceEpoch * 1000, DateTimeZone.UTC);
String resultingExampleDateTime = exampleDateTime.toString(DATE_FORMAT);


//---

import java.util.Date;
import org.apache.commons.lang.time.DateUtils;

Date exampleDate = new Date();
String exampleStringDate = "";

Date threeHoursAgo = DateUtils.addHours(exampleDate.getDate(), -3);
Date fiveDaysAgo = DateUtils.addDays(exampleDate.getDate(), -5);
Date oneMonthAgo = DateUtils.addMonths(exampleDate.getDate(), -1);
Date exampleConvertedDate = DateTimeExampleHelper.toDateTimeExample(exampleStringDate).toDate();

if (exampleDate.after(threeHoursAgo)) {
    LOG.debug("Last three hours: "+ exampleDate);
} else if (exampleDate.after(fiveDaysAgo)) {
    LOG.debug("Last five days: "+ exampleDate);
} else if(exampleDate.before(fiveDaysAgo) && lastPublishedDate.after(oneMonthAgo)) {
    LOG.debug("More than five days ago but less than one month: "+ exampleDate);
}

//---

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormatter;
import org.joda.time.format.ISODateTimeFormat;

public class DateTimeExampleHelper {
    private static final DateTimeFormatter ISO_DATE_TIME_FORMAT = ISODateTimeFormat.dateTimeNoMillis();
    
    public final static DateTime toDateTimeExample(String valueToConvert){
        if (value == null) {return null;}
        DateTime dateTimeConversion = ISO_DATE_TIME_FORMAT.parseDateTime(valueToConvert);
        return dateTimeConversion;
    }
}

//---


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public static final DateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss+00:00");

String currentTimestampFormattedWithSimpleDateFormat = SIMPLE_DATE_FORMAT.format(new Date());


//---

|||java calendar
|||java util calendar
|||java timezone

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
calendar.setTime(date);

int date = calendar.get(Calendar.DATE);
int second = calendar.get(Calendar.SECOND);
int minute = calendar.get(Calendar.MINUTE);
int hourOfDay = calendar.get(Calendar.HOUR_OF_DAY);
int month = calendar.get(Calendar.MONTH);
int year = calendar.get(Calendar.YEAR);




/*--------------------------------*/

|||java logger
|||logger
|||log
|||loggerfactory


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger LOG = LoggerFactory.getLogger(ExampleTestClass.class);

try {
	// some code
	fail("Should have thrown an IllegalArgumentException");
} catch (Exception e) {
	LOG.warning("Warning: " + e.getMessage(), e);
}

try {
	// some code
	fail("Should have thrown an IllegalArgumentException");
} catch (Exception e) {
	LOG.error("Error: " + e.getMessage(), e);
}



/*--------------------------------*/


|||springframework examples
|||java logger

import javax.annotation.Resource;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public abstract class ExampleAbstractClass {
    
    private static final Logger LOG = LoggerFactory.getLogger(ExampleAbstractClass.class);
    
    @Resource(name="exampleResource")
    private ExampleResourceType exampleResource;

    @Value("${path.to.value}")
    String variableToHoldValue;
}

//---


import javax.annotation.Resource;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.io.IOUtils;
import org.apache.cxf.jaxrs.model.wadl.Description;
import org.apache.cxf.jaxrs.model.wadl.Descriptions;
import org.apache.cxf.jaxrs.model.wadl.DocTarget;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/")
@Description("Example REST API.")
public class ExampleService {

    @Autowired
    private ExampleBuilder exampleBuilder;

    @GET
    @Path("example/path/{exampleQueryParameter: ([^?]+) }")
    @Consumes("application/json")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public String getExampleMethod(@PathParam("exampleQueryParameter") final String exampleQueryParameter,
        @Context ExampleContext exampleContext,
        @Description("Example path parameter.") @PathParam("exampleQueryPathParameter") final String exampleQueryPathParameter,
        @HeaderParam("Accept") final String mimeType) {
        String processingResult = exampleQueryParameter != null ? exampleQueryParameter.getSomething() : null;
        return processingResult;
    }
    
    @DELETE
    @Path("example/path/{exampleQueryParameter: ([^?]+) }")
    public Boolean deleteFromMemcache(@PathParam("exampleQueryParameter") final String exampleQueryParameter) {
        Boolean isDeleteSuccessful = delete(exampleQueryParameter);
        return isDeleteSuccessful;
    }

    @PUT
    @Path("putExamplePath")
    @Produces(MediaType.APPLICATION_JSON)
    @Descriptions({
        @Description(value="Example description", target=DocTarget.METHOD),
        @Description(value="Example description2", target=DocTarget.RESPONSE)
        })
    public Response examplePut(
            @Context Request request,
            @HeaderParam(HttpHeaders.ACCEPT) final String mimeType)  {
        
        // return Response.status(Status.NOT_FOUND).build();
        // return Response.noContent().build();

        Object exampleObject = new Object();
        return Response.ok(exampleObject).build();
    }

    @PUT
    @Path("putExamplePath2")
    @Produces(MediaType.APPLICATION_JSON)
    public Response examplePut2(
            @Context Request request,
            @Context UriInfo exampleUriInfo,
            @HeaderParam(HttpHeaders.ACCEPT) final String mimeType)  {
        
        return Response.created(exampleUriInfo.getRequestUri()).build();
    }
}




/*--------------------------------*/


|||http headers

// https://en.wikipedia.org/wiki/List_of_HTTP_header_fields

"Accept";
"Accept-Charset";
"Accept-Encoding";
"Accept-Language";
"Authorization";
"Cache-Control";
"Content-Encoding";
"Content-Language";
"Content-Length";
"Content-Location";
"Content-Type";
"Date";
"ETag";
"Expires";
"Host";
"Cookie";
"Set-Cookie";
"Last-Modified";
"Location";
"User-Agent";
"Vary";
"WWW-Authenticate";
"If-Match";
"If-Modified-Since";
"If-None-Match";
"If-Unmodified-Since";

//---

HTTP/HTTPS request verb GET:

Accept = application/xml


HTTP/HTTPS request verb POST:

Content-Type = application/xml



/*--------------------------------*/



|||mime types
|||mimetypes


"application/rdf+xml"
"application/rdf+json"
"application/x-turtle"
"application/xml"
"text/xml"
"application/json"
"text/plain"
"text/html"
"text/rdf+n3"
"*/*"



/*--------------------------------*/



|||property configuration
|||java properties

package example.pack;

import java.util.Properties;

public class PropertiesConfigurationExample {
    
    private Properties properties;
    
    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    public void setPropertyValue(String propertyKey, String propertyValue) throws RepositoryFailureException {
        properties.setProperty(propertyKey, propertyValue);
    }

    public void deleteValue(String propertyKey) throws ResourceNotFoundException, RepositoryFailureException {
        properties.remove(propertyKey);
    }

    public String getStringValue(String propertyKey, String defaultPropertyValue) {
        return properties.getProperty(propertyKey, defaultPropertyValue);
    }

    public Integer getIntegerValue(String propertyKey, Integer defaultPropertyValue) {
        String stringPropertyValue = properties.getProperty(propertyKey);
        return stringPropertyValue != null ? Integer.parseInt(stringPropertyValue) : defaultPropertyValue;
    }
}


/*--------------------------------*/



|||DEFAULT_SYSTEM_EXECUTION_SERVER_ENV
|||System.getenv

    public String getEnvironment() {
        String environment = System.getenv("DEFAULT_SYSTEM_EXECUTION_SERVER_ENV").toLowerCase();

        if (environment.matches("int") || environment.matches("test") || environment.matches("live")) {
            return environment;
        } else {
            return "development";
        }
    }



/*--------------------------------*/



|||getLocalHost
|||getHostName
|||java.net.InetAddress

import java.net.InetAddress;

    public String getHostnameFromInetAddress() {
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (Exception e) {
            return "Unknown hostname.";
        }
    }

/*--------------------------------*/



|||springframework
|||monitoring
|||jmx

package [PACKAGE.NAME];

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.jmx.export.annotation.ManagedAttribute;
import org.springframework.jmx.export.annotation.ManagedResource;

/**
* http://docs.spring.io/spring/docs/current/spring-framework-reference/html/jmx.html
@ManagedResource(
        objectName="bean:name=testBean4",
        description="My Managed Bean",
        log=true,
        logFile="jmx.log",
        currencyTimeLimit=15,
        persistPolicy="OnUpdate",
        persistPeriod=200,
        persistLocation="foo",
        persistName="bar")
*/
@ManagedResource()
public class SimpleJavaSpringServiceStatsMonitoringExample {

    private AtomicLong defaultCounter = new AtomicLong();
	
	@ManagedAttribute(description = "Example description.")
	public AtomicLong getDefaultCounter() {
		return defaultCounter;
	}

	public void incrementDefaultCounterByNumber(Long numberToIncrementBy) {
		AtomicLong atomicNumberToIncrementBy = new AtomicLong(numberToIncrementBy);
		safeIncrementDefaultCounterByNumber(defaultCounter, Long atomicNumberToIncrementBy);
	}
	
	public void incrementDefaultCounterByOne() {
		safeIncrementDefaultCounter(defaultCounter);
	}

    @ManagedOperation(description="safe increment")
    @ManagedOperationParameters({
        @ManagedOperationParameter(name = "atomicLong", description = "AtomicLong number")})
	private synchronized void safeIncrementDefaultCounter(AtomicLong counterToIncrement) {
		if (counterToIncrement.get() == Long.MAX_VALUE) {
			counterToIncrement.set(0);
		} else {
			counterToIncrement.incrementAndGet();
		}
	}

	private synchronized void safeIncrementDefaultCounterByNumber(AtomicLong counterToIncrement, AtomicLong atomicNumberToIncrementBy) {
		if (counterToIncrement.get() == Long.MAX_VALUE) {
			counterToIncrement.set(0);
		} else {
			counterToIncrement.addAndGet(atomicNumberToIncrementBy.get());
		}
	}
}



/*--------------------------------*/


|||properties file
|||base-environment.properties

### base-environment.properties
### properties file, can be overriden by files for each environment, for example dev.properties, int.properties, test.properties, live.properties

### base-environment.properties
log-level=[DEBUG/INFO/WARN/ERROR]

app.env=dev

ssl.keyStore=/etc/pki/[CERTIFICATE.P12]
ssl.keyStorePassword=[KEYSTORE-PASSWORD]
ssl.trustStore=/etc/pki/[TRUSTSTORE]

### int.properties
## overrides app.env and log-level from base-environment.properties file

log-level=INFO

app.env=int





/*--------------------------------*/



|||xquery
|||xqy
|||xinclude
|||x-include
|||xi:include
|||marklogic

xquery version "1.0-ml";

import module namespace namespace1 = "[NAMESPACE]" at "[/PATH/TO/XQY/FILE]"

xinc:node-expand(fn:doc("[DOCUMENT-ID]"));


(:---:)

xquery version "1.0-ml";


import module namespace namespace1 = "[NAMESPACE]" at "[/PATH/TO/XQY/FILE]"


for $each in [/XPATH]
return xdmp:document-delete(fn:base-uri($each))


(:---:)


xinc:node-expand(
<exampleXMLelement xsi:schemaLocation="[XSD-SCHEMA-URI]"
       uri="[URI]" version="0.1"
       xmlns:xi="http://www.w3.org/2001/XInclude" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns="[XMLNS-NAMESPACE]">
<xi:include href="[URI]"
  xpointer="xmlns(namespace1variable=http://www.example.com/example)
  xpointer(/namespace1variable:exampleElement1/namespace1variable:exampleElement2)">
  <xi:fallback>
    <warn>Unable to resolve XInclude for href="[URI]"
      xpointer="xmlns(namespace1variable=http://www.example.com/example)
      xpointer(/namespace1variable:exampleElement1/namespace1variable:exampleElement2)"[I-THINK-THIS-WILL-BE-PRINTED-LIKE-PRINTLN]</warn>
  </xi:fallback>
</xi:include>
</exampleXMLelement>
)


(:---:)



(: mark logic find all documents in db :)

http://stackoverflow.com/questions/10654431/how-to-get-total-number-of-documents-in-marklogic-database

xdmp:estimate(doc()),
xdmp:estimate(cts:search(doc(), ()))

xdmp:estimate(cts:search(/*, ()))


http://stackoverflow.com/questions/21530455/marklogic-count-old-documents-using-ctssearch-over-flwor

(:
let $uris := cts:uri-match("[DOCUMENT-ID-OR-WILDCARD]")[1 to 10]

for $uri in $uris (:cts:search(doc(), ()):) 
let $docs := fn:doc($uri)
:)

let $uris := cts:uri-match("[DOCUMENT-ID-OR-WILDCARD]")[1 to 10]

return (fn:count($uris))

(:---:)

declare namespace exampleNamespace = "http://www.example.com/namespace"


(:---:)


|||mustache template or xquery template logic example

xquery version "1.0-ml";

declare namespace exampleNamespace = "http://www.example.com/namespace"

{{#exampleBoolean}}
    let $exampleVariableResults := exampleNamespace:exampleFunction($exampleParam1, '{{exampleParam2}}', '{{exampleParam3}}, fn:false(), fn:true())
    return if (fn:count($exampleVariableResults) = 5) then
    $exampleVariableResults
    else
    for $exampleVariableResults2 in $exampleVariableResults
    where $exampleVariableResults2/exampleNamespace2:itemMeta/exampleNamespace2:provider eq 'someStringLiteral'
    order by $exampleVariable3 descending
    return $exampleVariableResults2
{{/exampleBoolean}}
{{^exampleBoolean}}
    for $exampleVariableResults2 in exampleNamespace:exampleFunction($exampleVariable3)
    where $exampleVariableResults2/exampleNamespace2:*/exampleNamespace2:exampleProperty/exampleNamespace2:exampleProperty2 eq '{{someStringLiteral2}}'
    return $exampleVariableResults2
{{/exampleBoolean}}



(:---:)


xquery version "1.0-ml";

declare namespace exampleNamespace = "http://www.example.com/namespace"

declare option xdmp:transaction-mode "query";

declare function local:exampleFunction($examplestringDateVariable as xs:string) {
    (xs:dateTime($examplestringDateVariable) - xs:dateTime('1970-01-01T00:00:00+00:00')) div xs:dayTimeDuration('PT60S')
};


(:---:)


fn:concat($exampleVariable1, ' ', $exampleVariable2))[1 to 20]


(:---:)

exampleElement1/exampleNamespace1:exampleElement2/exampleNamespace1:exampleElementWithIndex[1]/@exampleParameter1

(:-random xquery stuff-:)

declare namespace xi = "http://www.w3.org/2001/XInclude";

fn:root([...])

fn:QName([...])

xs:QName([...])

cts:element-query([...])

cts:search([...])

cts:element-attribute-value-query([...])

fn:true()

fn:false()

fn:collection()[[...]]

fn:insert-before([...])

fn:empty([...])

fn:count([...])

xdmp:unquote([...])

cts:element-range-query([...])

cts:and-query([...])

cts:or-query([...])

cts:element-value-query([...])

return
<exampleResultElement1 xmlns="http://www.example.com/namespace">
{if ($exampleBoolean1)
then <nestedExampleResultElement1>{{exampleVariable1}}</nestedExampleResultElement1>
else ()
}
{if ($exampleBoolean2)
then <nestedExampleResultElement2>{{exampleVariable2}}</nestedExampleResultElement1>
else ()
}
</exampleResultElement1>


/*--------------------------------*/

|||spring framework
|||spring beans
|||java spring
|||java beans


|||src/main/resources/applicationContextExample.xml

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:task="http://www.springframework.org/schema/task"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/security
        http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
        http://www.springframework.org/schema/task
        http://www.springframework.org/schema/security/spring-security-2.0.1.xsd
        http://www.springframework.org/schema/task/spring-task-3.1.xsd">

    <import resource="applicationContextApiExample.xml"/>

    <!-- Activates @Scheduled and @Async annotations for scheduling -->
    <task:annotation-driven executor="workerExecutor" />
    <task:executor id="workerExecutor"
                   pool-size="10"
                   queue-capacity="10" rejection-policy="DISCARD"/>
</beans>


|||src/main/resources/applicationContextApiExample.xml

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:task="http://www.springframework.org/schema/task"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/security
        http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
        http://www.springframework.org/schema/task
        http://www.springframework.org/schema/security/spring-security-2.0.1.xsd
        http://www.springframework.org/schema/task/spring-task-3.1.xsd">

    <context:component-scan base-package="[NAME-OF-BASE-PACKAGE]"/>

    <bean id="[CAMELCASE-ID]" class="[CLASSPATH]" init-method="initialise">
        <constructor-arg ref="[CONSTRUCTOR-ARG-REF]" />
        <constructor-arg value="[VALUE]" />
        <constructor-arg>
            <map>
                <entry key="[KEY]">
                    <bean class="[CLASSPATH]">
                        <property name="[PROPERTY-NAME]" value="[PROPERTY-VALUE]" />
                        <property name="[PROPERTY-NAME]" value="${[PROPERTY-VALUE-REFERENCE]}" />
                    </bean>
                </entry>
            </map>
        </constructor-arg>
        <constructor-arg>
            <bean class="[FACTORY-CLASSPATH]">
                <constructor-arg ref="[CONSTRUCTOR-ARG-REF]" />
                <property name="[PROPERTY-NAME]" value="[PROPERTY-VALUE]" />
                <property name="[PROPERTY-NAME]" value="${[PROPERTY-VALUE-REFERENCE]}" />
                <property name="[BOOLEAN-PROPERTY-NAME]" value="true" />
                <property name="[BOOLEAN-PROPERTY-NAME]" value="false" />
            </bean>
        </constructor-arg>
        <property name="[PROPERTY-NAME]" value="[PROPERTY-VALUE]" />
        <property name="[PROPERTY-NAME]" value="${[PROPERTY-VALUE-REFERENCE]}" />
    </bean>

    <bean id="empty" class="java.lang.String">
        <constructor-arg value="${log-level}" />
    </bean>
</beans>



|||src/main/resources/applicationContextJAXRSExample.xml


<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:jaxrs="http://cxf.apache.org/jaxrs"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
        http://cxf.apache.org/jaxrs http://cxf.apache.org/schemas/jaxrs.xsd
        http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-2.5.xsd">

    <import resource="classpath:META-INF/cxf/cxf.xml"/>
    <import resource="classpath:META-INF/cxf/cxf-servlet.xml"/>

    <jaxrs:server id="[CAMELCASE-ID]" address="[/URL/ADDRESS]">
        <jaxrs:serviceBeans>
            <bean class="[CLASSPATH]">
                <property name="[PROPERTY-NAME]" ref="[PROPERTY-VALUE]"/>
            </bean>
         </jaxrs:serviceBeans>
        <jaxrs:providers>
            <ref bean="[NAME-OF-BEAN-1]"/>
            <ref bean="[NAME-OF-BEAN-2]"/>
            <bean class="[CLASSPATH]">
                <constructor-arg ref="[CONSTRUCTOR-ARG-REF]"/>
                <property name="[PROPERTY-NAME]" ref="[PROPERTY-VALUE]"/>
            </bean>
        </jaxrs:providers>
         <jaxrs:inInterceptors>
            <bean class="[CLASSPATH]">
                <constructor-arg ref="[CONSTRUCTOR-ARG-REF-1]"/>
                <constructor-arg ref="[CONSTRUCTOR-ARG-REF-2]"/>
            </bean>
        </jaxrs:inInterceptors>
    </jaxrs:server>
</beans>



/*--------------------------------*/


|||spring framework
|||spring beans
|||java spring
|||java beans

|||src/main/webapp/WEB-INF/service--status-servlet.xml

<beans xmlns="http://www.springframework.org/schema/beans" xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation=" http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context-3.0.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd">
 
    <bean id="uploaderHandlerMapping" class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
    <property name="mappings">
        <props>
            <prop key="servicestatus">service--StatusController</prop>
        </props>
    </property>
    </bean>

    <!--  Service Listener beans -->    

    <bean id="service--StatusController" class="[CLASS-PATH-TO-CLASS]">
        <property name="listenersOfServices">
            <list>
                <ref bean="[LISTENER-BEAN-NAME1]" />
                <ref bean="[LISTENER-BEAN-NAME2]" />
                <ref bean="[LISTENER-BEAN-NAME3]" />
            </list>
        </property>
    </bean>

</beans>
    


/*--------------------------------*/



|||src/main/webapp/WEB-INF/web.xml

<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
            http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
        id="WebApp_ID" version="2.5">

    <display-name>[APP-NAME]</display-name>

    <context-param>
        <param-name>log4jConfigLocation</param-name>
        <param-value>classpath:log4j.properties</param-value>
    </context-param>

    <context-param>
        <param-name>webAppRootKey</param-name>
        <param-value>[APP-NAME]</param-value>
    </context-param>

    <context-param>
        <param-name>log4jExposeWebAppRoot</param-name>
        <param-value>false</param-value>
    </context-param>

    <context-param>
        <param-name>propertiesConfigLocation</param-name>
        <param-value>classpath:propertiesConfigContext.xml</param-value>
    </context-param>

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>

    <listener>
        <listener-class>[CLASS-PATH-FOR-LISTENER]</listener-class>
    </listener>

    <!--
    <listener>
        <listener-class>[CLASS-PATH-FOR-LISTENER]</listener-class>
    </listener>
    -->

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <listener>
        <listener-class>org.springframework.web.context.request.RequestContextListener</listener-class>
    </listener>

    <servlet>
        <servlet-name>CXFServlet</servlet-name>
        <servlet-class>org.apache.cxf.transport.servlet.CXFServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>CXFServlet</servlet-name>
        <url-pattern>/*</url-pattern>
    </servlet-mapping>
    
    <servlet>
        <servlet-name>service--status</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>2</load-on-startup>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>service--status</servlet-name>
        <url-pattern>/service--status</url-pattern>
    </servlet-mapping>

</web-app>



/*--------------------------------*/

|||log4j settings
|||log4j logging
|||log4j.properties

### Example live production jog4j properties:

log4j.rootLogger=${log-level}, rolling

#------------------- STDOUT --------------------------
log4j.appender.stdout.layout.ConversionPattern=%d{[yyyy.MM.dd HH:mm:ss]} %5p [%t] %c{2} - %0x %m%n
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender

#%d{ABSOLUTE} %-8.8t %5p %c{1} - %0x %m%n
#------------------- Daily rolling -------------------
log4j.appender.rolling.layout.ConversionPattern=%d{[yyyy.MM.dd HH:mm:ss]} %5p [%t] %c{2} - %0x %m%n
log4j.appender.rolling.File=${server.log.location}/[APP-NAME].log
log4j.appender.rolling=org.apache.log4j.DailyRollingFileAppender
log4j.appender.rolling.layout=org.apache.log4j.PatternLayout

log4j.additivity.org.springframework=false
log4j.category.org.springframework=ERROR, stdout
log4j.category.org.apache=${log-level}

#------------------- Memcache -------------------
log4j.category.net.spy.memcached=${log-level}, stdout
log4j.additivity.net.spy.memcached=false


//---

### Example test jog4j properties:

log4j.rootLogger=WARN, stdout

#------------------- STDOUT --------------------------
log4j.appender.stdout.layout.ConversionPattern=%d{[yyyy.MM.dd HH:mm:ss]} %c{2} - %0x %m%n
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender

log4j.category.org.springframework=WARN
log4j.category.org.apache=WARN


/*--------------------------------*/

|||jta.properties
|||jta
|||atomikos
|||TransactionsEssentials
|||https://www.atomikos.com/Main/TransactionsEssentials
|||https://www.atomikos.com/pub/Documentation/Tomcat7Integration35/jta.properties

# SAMPLE PROPERTIES FILE FOR THE TRANSACTION SERVICE
# THIS FILE ILLUSTRATES THE DIFFERENT SETTINGS FOR THE TRANSACTION MANAGER
# UNCOMMENT THE ASSIGNMENTS TO OVERRIDE DEFAULT VALUES;

# Required: factory implementation class of the transaction core.
# NOTE: there is no default for this, so it MUST be specified! 
# 
com.atomikos.icatch.service=com.atomikos.icatch.standalone.UserTransactionServiceFactory

        
# Set base name of file where messages are output 
# (also known as the 'console file').
#
# com.atomikos.icatch.console_file_name = tm.out

# Size limit (in bytes) for the console file;
# negative means unlimited.
#
# com.atomikos.icatch.console_file_limit=-1

# For size-limited console files, this option
# specifies a number of rotating files to 
# maintain.
#
# com.atomikos.icatch.console_file_count=1

# Set the number of log writes between checkpoints
#
# com.atomikos.icatch.checkpoint_interval=500

# Set output directory where console file and other files are to be put
# make sure this directory exists!
#
# com.atomikos.icatch.output_dir = ./

# Set directory of log files; make sure this directory exists!
#
# com.atomikos.icatch.log_base_dir = ./

# Set base name of log file
# this name will be  used as the first part of 
# the system-generated log file name
#
# com.atomikos.icatch.log_base_name = tmlog

# Set the max number of active local transactions 
# or -1 for unlimited.
#
# com.atomikos.icatch.max_actives = 50

# Set the default timeout (in milliseconds) for local transactions
#
# com.atomikos.icatch.default_jta_timeout = 10000

# Set the max timeout (in milliseconds) for local transactions
#
# com.atomikos.icatch.max_timeout = 300000

# The globally unique name of this transaction manager process
# override this value with a globally unique name
#
# com.atomikos.icatch.tm_unique_name = tm
    
# Do we want to use parallel subtransactions? JTA's default
# is NO for J2EE compatibility
#
# com.atomikos.icatch.serial_jta_transactions=true
                    
# If you want to do explicit resource registration then
# you need to set this value to false.
#
# com.atomikos.icatch.automatic_resource_registration=true  
    
# Set this to WARN, INFO or DEBUG to control the granularity
# of output to the console file.
#
# com.atomikos.icatch.console_log_level=WARN
    
# Do you want transaction logging to be enabled or not?
# If set to false, then no logging overhead will be done
# at the risk of losing data after restart or crash.
#
# com.atomikos.icatch.enable_logging=true

# Should two-phase commit be done in (multi-)threaded mode or not?
# Set this to false if you want commits to be ordered according
# to the order in which resources are added to the transaction.
#
# NOTE: threads are reused on JDK 1.5 or higher. 
# For JDK 1.4, thread reuse is enabled as soon as the 
# concurrent backport is in the classpath - see 
# http://mirrors.ibiblio.org/pub/mirrors/maven2/backport-util-concurrent/backport-util-concurrent/
#
# com.atomikos.icatch.threaded_2pc=false

# Should shutdown of the VM trigger shutdown of the transaction core too?
#
# com.atomikos.icatch.force_shutdown_on_vm_exit=false


/*--------------------------------*/

|||programming bash script 
|||programmingbashscript
|||bash programming
|||bash script programming
|||bashscript
|||bash script
|||run two bash scripts
|||run maven command with bash script

#!/usr/bin/env bash

./script1.sh && ./script2.sh

mvn clean install && ./script3.sh

//---

|||bash date
|||bash script date

date +%Y-%m-%d_%H-%M-%S

date +%Y-%m-%d_%H-%M-%S

date +%Y-%m-%d_%H:%M:%S

date +%Y%m%d%H%M%S

//---

https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash

Preferred Method: Using straight bash without getopt[s]

I originally answered the question as the OP asked. This Q/A is getting a lot of attention, so I should also offer the non-magic way to do this. I'm going to expand upon guneysus's answer to fix the nasty sed and include Tobias Kienzler's suggestion.

Two of the most common ways to pass key value pair arguments are:

Straight Bash Space Separated

Usage   ./myscript.sh -e conf -s /etc -l /usr/lib /etc/hosts 

#!/bin/bash
# Use -gt 1 to consume two arguments per pass in the loop (e.g. each
# argument has a corresponding value to go with it).
# Use -gt 0 to consume one or more arguments per pass in the loop (e.g.
# some arguments don't have a corresponding value to go with it such
# as in the --default example).
# note: if this is set to -gt 0 the /etc/hosts part is not recognized ( may be a bug )
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -e|--extension)
    EXTENSION="$2"
    shift # past argument
    ;;
    -s|--searchpath)
    SEARCHPATH="$2"
    shift # past argument
    ;;
    -l|--lib)
    LIBPATH="$2"
    shift # past argument
    ;;
    --default)
    DEFAULT=YES
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done
echo FILE EXTENSION  = "${EXTENSION}"
echo SEARCH PATH     = "${SEARCHPATH}"
echo LIBRARY PATH    = "${LIBPATH}"
echo "Number files in SEARCH PATH with EXTENSION:" $(ls -1 "${SEARCHPATH}"/*."${EXTENSION}" | wc -l)
if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 $1
fi
Straight Bash Equals Separated

#!/bin/bash

for i in "$@"
do
case $i in
    -e=*|--extension=*)
    EXTENSION="${i#*=}"
    shift # past argument=value
    ;;
    -s=*|--searchpath=*)
    SEARCHPATH="${i#*=}"
    shift # past argument=value
    ;;
    -l=*|--lib=*)
    LIBPATH="${i#*=}"
    shift # past argument=value
    ;;
    --default)
    DEFAULT=YES
    shift # past argument with no value
    ;;
    *)
            # unknown option
    ;;
esac
done
echo "FILE EXTENSION  = ${EXTENSION}"
echo "SEARCH PATH     = ${SEARCHPATH}"
echo "LIBRARY PATH    = ${LIBPATH}"
echo "Number files in SEARCH PATH with EXTENSION:" $(ls -1 "${SEARCHPATH}"/*."${EXTENSION}" | wc -l)
if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 $1
fi
To better understand ${i#*=} search for "Substring Removal" in this guide. It is functionally equivalent to `sed 's/[^=]*=//' <<< "$i"` which calls a needless subprocess or `echo "$i" | sed 's/[^=]*=//'` which calls two needless subprocesses.

Using getopt[s]

from: http://mywiki.wooledge.org/BashFAQ/035#getopts

Never use getopt(1). getopt cannot handle empty arguments strings, or arguments with embedded whitespace. Please forget that it ever existed.

The POSIX shell (and others) offer getopts which is safe to use instead. Here is a simplistic getopts example:

#!/bin/sh

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

# Initialize our own variables:
output_file=""
verbose=0

while getopts "h?vf:" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    v)  verbose=1
        ;;
    f)  output_file=$OPTARG
        ;;
    esac
done

shift $((OPTIND-1))

[ "$1" = "--" ] && shift

echo "verbose=$verbose, output_file='$output_file', Leftovers: $@"

# End of file
The advantages of getopts are:

It's portable, and will work in e.g. dash.
It can handle things like -vf filename in the expected Unix way, automatically.
The disadvantage of getopts is that it can only handle short options (-h, not --help) without trickery.

There is a getopts tutorial (http://wiki.bash-hackers.org/howto/getopts_tutorial) which explains what all of the syntax and variables mean. In bash, there is also help getopts, which might be informative.

//---

/*--------------------------------*/

|||deploy script
|||deploy.sh

if [ -e "target/[APP-NAME].war" ]
then
    sudo rm -rf /usr/local/apache-tomcat-[APP-NAME]/webapps/[APP-NAME]
    sudo /sbin/service apache-tomcat-[APP-NAME] stop
    sudo cp target/[APP-NAME].war /usr/local/apache-tomcat-[APP-NAME]/webapps/
    chmod a+r /usr/local/apache-tomcat-[APP-NAME]/webapps/
    sudo rm -rf /data/app-logs/apache-tomcat-[APP-NAME]/*
    sudo touch /data/app-logs/apache-tomcat-[APP-NAME]/catalina.out
    sudo chmod a+w /data/app-logs/apache-tomcat-[APP-NAME]/catalina.out
    sudo /sbin/service apache-tomcat-[APP-NAME] start
    sudo /etc/init.d/memcached restart
else
        echo "Did not find target webapp, make sure mvn clean install ran from the parent directoy."
fi



/*--------------------------------*/

|||cucumber tests
|||cucumber bundle
|||bundle

bundle exec cucumber --tags @wip

bundle install

// Run a single feature file:

bundle exec cucumber features/example.feature

/*--------------------------------*/

|||pom file
|||spring framework
|||spring framework java


<?xml version="1.0"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>[GROUP.ID]</groupId>
    <artifactId>[PROJECT-NAME]</artifactId>
    <packaging>war</packaging>
    <version>0.1.1-SNAPSHOT</version> <!-- Update <appVersion> below if updating this.  Remove 'SNAPSHOT'. -->
    <url>[PROJECT-URL]</url>

    <parent>
        <groupId>[GROUP.ID.PARENT]</groupId>
        <artifactId>war</artifactId>
        <version>[VERSION]</version>
    </parent>

    <properties>
        <appName>[APP-NAME]</appName>
        <appVersion>[APP-VERSION]</appVersion> <!-- Update this when updating the <version> element above. -->
        <tomcatPackageName>[NAME-OF-APACHE]</tomcatPackageName>
        <runas.username>[USERNAME]</runas.username>
        <runas.group>[APP-PROJECT-NAME]</runas.group>
        <server.pool>3</server.pool>
        <requires>[REQUIRES]</requires>
        <servletapi.version>[SERVLET-API.VERSION]</servletapi.version>
        <slf4j.version>[SLF4J.VERSION]</slf4j.version>
        <spring.version>[SPRING.VERSION]</spring.version>

        <!-- Repo where to deploy the JAR into, used in maven-deploy-plugin below. -->
        <jar-repo-url>${[PATH-TO-URL-VARIABLE]}</jar-repo-url>
    </properties>

    <!-- Profile used by the build job on Hudson on Test to use the release repo instead of a snapshot. -->
    <profiles>
        <profile>
            <id>release-repo</id>
            <properties>
                <jar-repo-url>${[PATH-TO-URL-VARIABLE]}</jar-repo-url>
            </properties>
        </profile>
    </profiles>

    <dependencies>
        <dependency>
            <groupId>[GROUP.ID]</groupId>
            <artifactId>[ARTIFACTID]</artifactId>
            <version>${[VERSION-VARIABLE]}</version>
        </dependency>
        <dependency>
            <groupId>[GROUP.ID]</groupId>
            <artifactId>[ARTIFACT-ID]</artifactId>
            <version>[VERSION]</version>
            <exclusions>
                <exclusion>
                    <groupId>[GROUP.ID]</groupId>
                    <artifactId>[ARTIFACT-ID]</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>${servletapi.version}</version> <!-- Version is defined in <properties>. -->
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>${slf4j.version}</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>${slf4j.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.maven</groupId>
            <artifactId>maven-artifact</artifactId>
            <version>3.0.3</version>
        </dependency>

        <dependency>
           <groupId>dom4j</groupId>
           <artifactId>dom4j</artifactId>
           <version>1.6.1</version>
        </dependency>

        <dependency>
            <groupId>jaxen</groupId>
            <artifactId>jaxen</artifactId>
            <version>1.1.1</version>
        </dependency>

        <dependency>
            <groupId>com.timgroup</groupId>
            <artifactId>java-statsd-client</artifactId>
            <version>3.0.1</version>
        </dependency>

        <!-- Spring Framework -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-expression</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spring.version}</version>
            <scope>test</scope>
        </dependency>

        <!-- Apache commons -->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>1.4</version>
        </dependency>
        <dependency>
            <groupId>org.apache.httpcomponents</groupId>
            <artifactId>httpclient</artifactId>
            <version>4.1.1</version>
        </dependency>

        <dependency>
            <groupId>javax.ws.rs</groupId>
            <artifactId>jsr311-api</artifactId>
            <version>1.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-bundle-jaxrs</artifactId>
            <version>2.4.0</version>
            <exclusions>
                <exclusion>
                    <groupId>org.eclipse.jetty</groupId>
                    <artifactId>jetty-server</artifactId>
                </exclusion>
                <exclusion>
                    <groupId>org.apache.geronimo.specs</groupId>
                    <artifactId>geronimo-servlet_3.0_spec</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <!--  Jackson JSON -->
        <dependency>
            <groupId>org.codehaus.jackson</groupId>
            <artifactId>jackson-core-lgpl</artifactId>
            <version>1.8.2</version>
        </dependency>
        <dependency>
            <groupId>org.codehaus.jackson</groupId>
            <artifactId>jackson-mapper-lgpl</artifactId>
            <version>1.8.2</version>
        </dependency>

        <!-- Testing only dependencies. -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.8.2</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-all</artifactId>
            <version>1.9.0</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-server</artifactId>
            <version>7.3.1.v20110307</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-bundle-jaxrs</artifactId>
            <version>2.4.1</version>
            <exclusions>
                <exclusion>
                    <groupId>org.eclipse.jetty</groupId>
                    <artifactId>jetty-server</artifactId>
                </exclusion>
                <exclusion>
                    <artifactId>spring-beans</artifactId>
                    <groupId>org.springframework</groupId>
                </exclusion>
                <exclusion>
                    <artifactId>spring-asm</artifactId>
                    <groupId>org.springframework</groupId>
                </exclusion>
                <exclusion>
                    <artifactId>spring-expression</artifactId>
                    <groupId>org.springframework</groupId>
                </exclusion>
            </exclusions>
        </dependency>

    </dependencies>

    <build>
        <finalName>[APP-PROJECT-NAME]</finalName>
        <resources>
            <resource>
                <directory>src/main/webapp</directory>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
                <includes>
                    <include>**/*.xml</include>
                    <include>**/*.properties</include>
                </includes>
            </resource>
        </resources>
        <testResources>
            <testResource>
                <directory>src/test/java</directory>
                <excludes>
                    <exclude>**/*.java</exclude>
                </excludes>
            </testResource>
            <testResource>
                <directory>src/test/resources</directory>
            </testResource>
        </testResources>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <executions>
                    <execution>
                        <id>make-a-jar</id>
                        <phase>compile</phase>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-install-plugin</artifactId>
                <executions>
                    <execution>
                        <phase>install</phase>
                        <goals>
                            <goal>install-file</goal>
                        </goals>
                        <configuration>
                            <packaging>jar</packaging>
                            <artifactId>${project.artifactId}</artifactId> <!-- This gets it's value by following XML path of the <project> element, and then the <artifactId> element. -->
                            <groupId>${project.groupId}</groupId>
                            <version>${project.version}</version>
                            <file>
                                ${project.build.directory}/${project.artifactId}.jar
                            </file>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <!-- This is required to build a jar to be used by the project which depends on this one. -->
                <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-deploy-plugin</artifactId>
                    <executions>
                        <execution>
                            <phase>deploy</phase>
                            <goals>
                                <goal>deploy-file</goal>
                            </goals>
                            <configuration>
                                <packaging>jar</packaging>
                                <generatePom>true</generatePom>
                                <url>${jar-repo-url}</url>
                                <artifactId>${project.artifactId}</artifactId>
                                <groupId>${project.groupId}</groupId>
                                <version>${project.version}</version>
                                <file>${project.build.directory}/${project.artifactId}.jar</file>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-report-plugin</artifactId>
                <version>2.5</version>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.0.2</version>
                <configuration>
                    <source>1.6</source>
                    <target>1.6</target>
                </configuration>
            </plugin>
            <plugin>
                  <groupId>org.apache.maven.plugins</groupId>
                  <artifactId>maven-eclipse-plugin</artifactId>
                  <version>2.5</version>
                  <configuration>
                     <wtpversion>1.5</wtpversion>
                  </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-antrun-plugin</artifactId>
                <version>1.7</version>
                <executions>
                    <execution>
                        <phase>validate</phase>
                        <goals>
                            <goal>run</goal>
                        </goals>
                        <configuration>
                            <tasks>
                                <echo>[jar-repo-url] ${jar-repo-url}</echo>
                            </tasks>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

        </plugins>
    </build>

    <reporting>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-report-plugin</artifactId>
                <version>2.5</version>
            </plugin>
        </plugins>
    </reporting>
</project>

```

---
