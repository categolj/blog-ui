package am.ik.blog;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.util.Base64Utils;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {
		"blog.retry-first-backoff=1ms" })
public class ActuatorTest {
	@LocalServerPort
	int port;
	WebTestClient webClient;

	@Before
	public void setup() {
		this.webClient = WebTestClient.bindToServer() //
				.baseUrl("http://localhost:" + port) //
				.build();
	}

	@Test
	public void testInfo() {
		this.webClient.get() //
				.uri("/actuator/info") //
				.exchange() //
				.expectStatus().isOk();
	}

	@Test
	public void testHealthWithoutAuth() {
		this.webClient.get() //
				.uri("/actuator/health") //
				.exchange() //
				.expectStatus().isOk() //
				.expectBody(JsonNode.class) //
				.consumeWith(n -> {
					JsonNode body = n.getResponseBody();
					assertThat(body).isNotNull();
					assertThat(body.has("status")).isTrue();
					assertThat(body.get("status").asText()).isEqualTo("UP");
					assertThat(body.has("details")).isFalse();
				});
	}

	@Test
	public void testHealthWithAuth() {
		this.webClient.get() //
				.uri("/actuator/health") //
				.header("Authorization",
						"Basic " + Base64Utils.encodeToString("test:pass".getBytes()))
				.exchange() //
				.expectStatus().isOk() //
				.expectBody(JsonNode.class) //
				.consumeWith(n -> {
					JsonNode body = n.getResponseBody();
					assertThat(body).isNotNull();
					assertThat(body.has("status")).isTrue();
					assertThat(body.get("status").asText()).isEqualTo("UP");
					assertThat(body.has("details")).isTrue();
				});
	}

	@Test
	public void testPrometheusWithoutAuth() {
		this.webClient.get() //
				.uri("/actuator/prometheus") //
				.exchange() //
				.expectStatus().isUnauthorized();
	}

	@Test
	public void testPrometheusWithAuth() {
		this.webClient.get() //
				.uri("/actuator/prometheus") //
				.header("Authorization",
						"Basic " + Base64Utils.encodeToString("test:pass".getBytes()))
				.exchange() //
				.expectStatus().isOk();
	}

	@Test
	public void testPrometheusFilter() {
		this.webClient.get() //
				.uri("/actuator/prometheus") //
				.header("Authorization",
						"Basic " + Base64Utils.encodeToString("test:pass".getBytes()))
				.exchange() //
				.expectStatus().isOk();
		this.webClient.get() //
				.uri("/actuator/health") //
				.exchange() //
				.expectStatus().isOk();
		this.webClient.get() //
				.uri("/actuator/info") //
				.exchange() //
				.expectStatus().isOk();

		this.webClient.get() //
				.uri("/actuator/prometheus") //
				.header("Authorization",
						"Basic " + Base64Utils.encodeToString("test:pass".getBytes()))
				.exchange() //
				.expectStatus().isOk().expectBody(String.class).consumeWith(n -> {
					String body = n.getResponseBody();
					assertThat(body).doesNotContain("uri=\"/actuator");
				});
	}

	@Test
	@Ignore
	public void testHystrixMetrics() {
		this.webClient.get() //
				.uri("/entries") //
				.exchange() //
				.expectBody(String.class)
				.consumeWith(r -> assertThat(r.getResponseBody()).isNotEmpty());
		this.webClient.get() //
				.uri("/actuator/prometheus") //
				.header("Authorization",
						"Basic " + Base64Utils.encodeToString("test:pass".getBytes()))
				.exchange() //
				.expectStatus().isOk().expectBody(String.class).consumeWith(n -> {
					String body = n.getResponseBody();
					assertThat(body).contains("hystrix_execution_total");
				});
	}
}
