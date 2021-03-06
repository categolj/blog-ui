package am.ik.blog;

import java.util.List;
import java.util.concurrent.TimeUnit;

import am.ik.blog.model.Category;
import am.ik.blog.model.Entry;
import am.ik.blog.model.Tag;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.result.view.Rendering;
import org.springframework.web.server.ServerWebExchange;

import static org.springframework.http.HttpHeaders.CACHE_CONTROL;

@Controller
public class BlogUiController {
	private final BlogClient blogClient;

	public BlogUiController(BlogClient blogClient) {
		this.blogClient = blogClient;
	}

	@RequestMapping(path = { "/", "/entries" }, method = { RequestMethod.GET,
			RequestMethod.HEAD })
	public Mono<Rendering> home(@PageableDefault(size = 50) Pageable pageable,
			ServerWebExchange exchange) {
		Flux<Entry> entries = this.blogClient.streamAll(pageable).cache();
		Rendering.Builder<?> builder = Rendering.view("index") //
				.modelAttribute("entries", entries);
		return entries.count() //
				.filter(x -> x > 0) //
				.flatMap(x -> entries.elementAt(0)) //
				.map(e -> {
					exchange.checkNotModified(e.getUpdated().getDate().toInstant());
					return builder //
							.header(CACHE_CONTROL,
									"max-age=" + TimeUnit.HOURS.toSeconds(3)) //
							.build();
				}) //
				.switchIfEmpty(Mono.fromCallable(builder::build));
	}

	@GetMapping(path = { "/", "/entries" }, params = "q")
	public Rendering search(@RequestParam("q") String query,
			@PageableDefault(size = 50) Pageable pageable) {
		Flux<Entry> entries = this.blogClient.streamByQuery(query, pageable);
		return Rendering.view("index") //
				.modelAttribute("entries", entries) //
				.modelAttribute("query", query) //
				.build();
	}

	@GetMapping("/tags/{tag}/entries")
	public Rendering byTag(@PathVariable("tag") Tag tag,
			@PageableDefault(size = 100) Pageable pageable) {
		Flux<Entry> entries = this.blogClient.streamByTag(tag, pageable);
		return Rendering.view("index") //
				.modelAttribute("entries", entries) //
				.modelAttribute("tag", tag) //
				.build();
	}

	@GetMapping("/categories/{categories}/entries")
	public Rendering byCategories(@PathVariable("categories") List<Category> categories,
			@PageableDefault(size = 100) Pageable pageable) {
		Flux<Entry> entries = this.blogClient.streamByCategories(categories, pageable);
		return Rendering.view("index") //
				.modelAttribute("entries", entries) //
				.modelAttribute("categories", categories) //
				.build();
	}

	@RequestMapping(path = "/entries/{entryId}", method = { RequestMethod.GET,
			RequestMethod.HEAD })
	public Mono<Rendering> byId(@PathVariable("entryId") Long entryId,
			ServerWebExchange exchange) {
		Mono<Entry> entry = this.blogClient.findById(entryId).cache();
		return entry.map(e -> {
			exchange.checkNotModified(e.getUpdated().getDate().toInstant());
			return Rendering.view("entry") //
					.modelAttribute("entry", entry) //
					.modelAttribute("checker", entry.map(ContentChecker::new)) //
					.header(CACHE_CONTROL, "max-age=" + TimeUnit.HOURS.toSeconds(3)) //
					.build();
		});
	}

	@GetMapping("/p/entries/{entryId}")
	public Rendering premiumById(@PathVariable("entryId") Long entryId) {
		return Rendering.view("redirect:/entries/{entryId}").build();
	}

	@GetMapping("/categories")
	public Rendering categories() {
		Flux<List<Category>> categories = this.blogClient.streamCategories();
		return Rendering.view("categories") //
				.modelAttribute("categories", categories) //
				.build();
	}

	@GetMapping("/tags")
	public Rendering tags() {
		Flux<Tag> tags = this.blogClient.streamTags();
		return Rendering.view("tags") //
				.modelAttribute("tags", tags) //
				.build();
	}

	public static class ContentChecker {
		private Entry entry;
		private Boolean isQuiteDanger;
		private Boolean isDanger;
		private Boolean isWarning;
		private Boolean isCaution;

		public ContentChecker(Entry entry) {
			this.entry = entry;
			this.isQuiteDanger = this.isQuiteDanger();
			this.isDanger = this.isDanger();
			this.isWarning = this.isWarning();
			this.isCaution = this.isCaution();
		}

		public boolean isQuiteDanger() {
			if (this.isQuiteDanger != null) {
				return this.isQuiteDanger;
			}
			return this.entry.isOverFiveYearsOld();
		}

		public boolean isDanger() {
			if (this.isDanger != null) {
				return this.isDanger;
			}
			return !this.isQuiteDanger() && this.entry.isOverThreeYearsOld();
		}

		public boolean isWarning() {
			if (this.isWarning != null) {
				return this.isWarning;
			}
			return !this.isQuiteDanger() && !this.isDanger()
					&& this.entry.isOverOneYearOld();
		}

		public boolean isCaution() {
			if (this.isCaution != null) {
				return this.isCaution;
			}
			return !this.isQuiteDanger() && !this.isDanger() && !this.isWarning()
					&& this.entry.isOverHalfYearOld();
		}

	}
}
